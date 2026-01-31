FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD sh -c "npm run build && rm -rf /dist/* && cp -r dist/* /dist/"