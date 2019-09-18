# to remove builder containers from computer run 
# docker image prune --filter label=stage=intermediate
# they are labeled as stage=intermediate

# build environment
FROM node:8.12.0 as builder
LABEL stage=intermediate
# COPY ./sleep.sh .
WORKDIR /var/apps/frontend
COPY . .
RUN npm install
RUN npm run build
RUN rm build/service-worker.js
# CMD ["/bin/sh", "./sleep.sh"]

# production environment
FROM node:8.12.0-alpine as production
RUN mkdir -p /var/apps/frontend/build
COPY --from=builder /var/apps/frontend/build /var/apps/frontend/build
# COPY ./build /var/apps/frontend/build
COPY ./prod-server.js /var/apps/frontend/server.js
RUN npm install express@4.16.3 http-proxy@1.17.0 compression@1.7.3
CMD ["node", "/var/apps/frontend/server.js"]

# FROM nginx-alpine:1.15.3 as production
# # RUN rm -rf /etc/nginx/conf.d
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# # COPY --from=builder /var/apps/frontend/build /usr/share/nginx/html
# COPY ./build /usr/share/nginx/html
# ENTRYPOINT ["nginx","-g","daemon off;"]