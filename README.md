## 💂‍♂️ Firmware Project - Backend

Node.js application server for firmware upload
Project made to be the backend of [Firmware-Frontend](https://github.com/ErnandesAJr/firmwarecontrol-frontend).

## 👾 Setup for development

```bash
# change the urls into .env file
Create the file .env at the root of the project and set the following properties as you need:

# NODE_ENV is the enviroment variable to project context, should be 'local'
STORAGE_TYPE=local

# PORT has to be the URL where this server runs
PORT=

# Variables to configure POSTGRESS database
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=


```

## 🔭 Setup for production

```bash
# STORAGE_TYPE is the enviroment variable to project context, should be 's3'
STORAGE_TYPE=s3

AWS_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=

NODE_ENV=production

DATABASE_URL=
```

## 🚀 Install dependencies

```bash
npm install
```

## 🌠 Serve the application

```bash
npm start
```
