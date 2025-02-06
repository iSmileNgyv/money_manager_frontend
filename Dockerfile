FROM node:22 AS build
WORKDIR /app
COPY frontend/money_manager_frontend/package.json frontend/money_manager_frontend/package-lock.json ./
RUN npm install
COPY frontend/money_manager_frontend/ .
RUN npm run build -- --configuration production
VOLUME /app/dist/money_manager_frontend/browser
