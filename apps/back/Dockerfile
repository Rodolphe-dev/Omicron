FROM node:20.17.0-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx nx build back --prod --verbose --skip-nx-cache --no-cloud --base-href /admin/

FROM nginx:alpine
COPY --from=builder /app/dist/apps/back/browser /usr/share/nginx/html/back
COPY /apps/back/nginx.back.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]