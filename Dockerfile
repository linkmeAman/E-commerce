FROM node

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY backend backend
COPY frontend frontend

RUN npm install

ENTRYPOINT [ "node","backend/server.js" ]