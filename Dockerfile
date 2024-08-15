# Dockerfile
FROM node:18 as build

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Configurar root-config
WORKDIR /Single-spa-app/root-config
COPY root-config/package*.json ./
RUN npm install
COPY root-config/ .
RUN npm run build

# Configurar React app
WORKDIR /Single-spa-app/react-tasks
COPY react-tasks/package*.json ./
RUN npm install
COPY react-tasks/ .
RUN npm run build

# Configurar Angular app
WORKDIR /Single-spa-app/angular-login
COPY angular-login/package*.json ./
RUN npm install
COPY angular-login/ .
RUN npm run build

# Configurar Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /Single-spa-app/root-config/dist /usr/share/nginx/html/root-config
COPY --from=build /Single-spa-app/react-tasks/dist /usr/share/nginx/html/react-tasks
COPY --from=build /Single-spa-app/angular-login/dist /usr/share/nginx/html/angular-login

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]