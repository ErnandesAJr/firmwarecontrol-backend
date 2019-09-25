# Upload Project - Backend

Node.js application server for file upload 

## Setup for development

``` bash
# change the urls into .env file
Create the file .env at the root of the project and set the following properties as you need:

# NODE_ENV is the enviroment variable to project context, should be 'local'
STORAGE_TYPE=local

# SERVER_PORT has to be the URL where this server runs
SERVER_PORT=3000

# Variables to configure MONGODB database
MONGO_URL=

```

## Install dependencies
```bash
npm install
```

## Serve the application
```bash
npm start
```

## Setup for production

``` bash
# STORAGE_TYPE is the enviroment variable to project context, should be 's3' 
STORAGE_TYPE=s3

AWS_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=


SERVER_PORT=
NODE_ENV=


POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=

APP_URL=

STORAGE_TYPE=

AWS_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=