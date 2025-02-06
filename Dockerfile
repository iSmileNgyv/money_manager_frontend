# Node.js tabanlı bir imaj kullanarak Angular projesini derleyelim
FROM node:latest AS build

# Çalışma dizinini belirle
WORKDIR /app

# Proje dosyalarını kopyala
COPY package.json package-lock.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm proje dosyalarını kopyala
COPY . .

# Angular projesini derle
RUN npm run build -- --configuration production

# Derlenmiş dosyaları bir volume'a kopyala
VOLUME /app/dist/money_manager_frontend/browser
