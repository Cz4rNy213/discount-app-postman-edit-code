GOOGLE_PROJECT_ID=groovy-granite-384220
CLOUD_RUN_SERVICE=groovy-granite-384220-service
INSTANCE_CONNECTION_NAME=groovy-granite-384220:europe-central2:restaurants
DB_USER=root
DB_PASS=Mkolek1000
DB_NAME=restaurants

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
  --project=$GOOGLE_PROJECT_ID

gcloud run deploy $CLOUD_RUN_SERVICE \
  --image gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
  --add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
  --update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_PASS=$DB_PASS,DB_USER=$DB_USER,DB_NAME=$DB_NAME \
  --platform managed \
  --region europe-central2 \
  --allow-unauthenticated \
  --project=$GOOGLE_PROJECT_ID
