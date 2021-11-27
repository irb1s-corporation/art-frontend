# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.16.0-alpine3.10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
#RUN CI=true npm test
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17.4-alpine
COPY --from=build-stage /app/build/ /var/www/html
# Copy the default nginx.conf provided by app-frontend
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
#/usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]