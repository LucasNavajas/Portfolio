FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build -- --configuration=production

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/angular-portfolio-web/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
