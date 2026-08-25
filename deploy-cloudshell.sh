#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-}"
REGION="${REGION:-asia-southeast1}"
SERVICE_NAME="${SERVICE_NAME:-geinel}"
BUCKET_NAME="${BUCKET_NAME:-}"
ARTIFACT_REPO="${ARTIFACT_REPO:-geinel}"
SKIP_ASSET_UPLOAD="${SKIP_ASSET_UPLOAD:-false}"
GLOBAL_RATE_LIMIT="${GLOBAL_RATE_LIMIT:-500}"
GLOBAL_RATE_LIMIT_WINDOW_MS="${GLOBAL_RATE_LIMIT_WINDOW_MS:-900000}"

usage() {
  cat <<EOF
Usage:
  ./deploy-cloudshell.sh --project PROJECT_ID

Optional:
  --region REGION                  Default: asia-southeast1
  --service SERVICE_NAME            Default: geinel
  --bucket BUCKET_NAME              Default: PROJECT_ID-geinel-assets
  --repo ARTIFACT_REPO              Default: geinel
  --skip-assets                     Skip Cloud Storage asset upload
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --project)
      PROJECT_ID="$2"
      shift 2
      ;;
    --region)
      REGION="$2"
      shift 2
      ;;
    --service)
      SERVICE_NAME="$2"
      shift 2
      ;;
    --bucket)
      BUCKET_NAME="$2"
      shift 2
      ;;
    --repo)
      ARTIFACT_REPO="$2"
      shift 2
      ;;
    --skip-assets)
      SKIP_ASSET_UPLOAD="true"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$PROJECT_ID" ]]; then
  PROJECT_ID="$(gcloud config get-value project 2>/dev/null || true)"
fi

if [[ -z "$PROJECT_ID" ]]; then
  echo "Missing project ID. Run ./deploy-cloudshell.sh --project PROJECT_ID" >&2
  exit 1
fi

if [[ -z "$BUCKET_NAME" ]]; then
  BUCKET_NAME="${PROJECT_ID}-geinel-assets"
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ASSET_BASE_URL="/assets"
IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${ARTIFACT_REPO}/${SERVICE_NAME}"

run() {
  local label="$1"
  shift
  echo
  echo "==> ${label}"
  "$@"
}

run "Set active gcloud project" gcloud config set project "$PROJECT_ID"

run "Enable required Google Cloud APIs" gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  storage.googleapis.com

if ! gcloud artifacts repositories describe "$ARTIFACT_REPO" --location "$REGION" >/dev/null 2>&1; then
  run "Create Artifact Registry repository" gcloud artifacts repositories create "$ARTIFACT_REPO" \
    --repository-format=docker \
    --location "$REGION" \
    --description "Docker images for the portfolio template"
else
  echo "Artifact Registry repository exists: ${ARTIFACT_REPO}"
fi

if ! gcloud storage buckets describe "gs://${BUCKET_NAME}" >/dev/null 2>&1; then
  run "Create Cloud Storage asset bucket" gcloud storage buckets create "gs://${BUCKET_NAME}" \
    --location "$REGION" \
    --uniform-bucket-level-access
else
  echo "Cloud Storage bucket exists: gs://${BUCKET_NAME}"
fi

PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")"
RUNTIME_SERVICE_ACCOUNT="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

run "Grant Cloud Run runtime access to media bucket" gcloud storage buckets add-iam-policy-binding "gs://${BUCKET_NAME}" \
  --member="serviceAccount:${RUNTIME_SERVICE_ACCOUNT}" \
  --role="roles/storage.objectViewer"

if [[ "$SKIP_ASSET_UPLOAD" != "true" ]]; then
  run "Upload media assets to Cloud Storage" gcloud storage cp --recursive "${ROOT_DIR}/public/assets/"* "gs://${BUCKET_NAME}"
  run "Set long-lived cache headers on media assets" gcloud storage objects update "gs://${BUCKET_NAME}/**" \
    --cache-control="public,max-age=31536000,immutable"
fi

run "Build and push container with Cloud Build" gcloud builds submit "$ROOT_DIR" --tag "$IMAGE"

run "Deploy Cloud Run service" gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE" \
  --region "$REGION" \
  --allow-unauthenticated \
  --set-env-vars "ASSET_BASE_URL=${ASSET_BASE_URL},ASSET_BUCKET_NAME=${BUCKET_NAME},GLOBAL_RATE_LIMIT=${GLOBAL_RATE_LIMIT},GLOBAL_RATE_LIMIT_WINDOW_MS=${GLOBAL_RATE_LIMIT_WINDOW_MS}"

SERVICE_URL="$(gcloud run services describe "$SERVICE_NAME" --region "$REGION" --format="value(status.url)")"

echo
echo "Deploy complete."
echo "Service URL: ${SERVICE_URL}"
echo "Asset URL:   ${ASSET_BASE_URL} (served by Cloud Run)"
