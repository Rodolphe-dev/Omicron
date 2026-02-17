# Build stage for front-end
FROM node:20.17.0-alpine AS front-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx nx build front --prod --verbose --skip-nx-cache --no-cloud

# Build stage for back-end
FROM node:20.17.0-alpine AS back-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx nx build back --prod --verbose --skip-nx-cache --no-cloud

# Final stage
FROM nginx:alpine
# Copy front-end files
COPY --from=front-builder /app/dist/apps/front/browser /usr/share/nginx/html/front
# Copy back-end files
COPY --from=back-builder /app/dist/apps/back/browser /usr/share/nginx/html/back
# Copy Nginx configuration
COPY /nginx.conf /etc/nginx/conf.d/default.conf
# Copy custom 404 page
COPY custom_404.html /usr/share/nginx/html/custom_404.html
# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
