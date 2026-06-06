FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Build TypeScript & Generate Prisma client
RUN npm run build
RUN npx prisma generate

EXPOSE 3001
CMD [ "npm", "start" ]
