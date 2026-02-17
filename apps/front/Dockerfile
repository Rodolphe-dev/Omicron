FROM node:20.17.0-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx nx build front --prod --verbose --skip-nx-cache --no-cloud

FROM nginx:alpine
COPY --from=builder /app/dist/apps/front/browser /usr/share/nginx/html/front
COPY /apps/front/nginx.front.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]