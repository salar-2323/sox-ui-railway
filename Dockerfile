# مرحله اول: بک‌اند
FROM node:18 AS backend
WORKDIR /app

COPY server.js package*.json ./
RUN npm install

# مرحله دوم: سرو پنل HTML
FROM node:18
WORKDIR /app

RUN npm install -g serve

COPY public ./public
COPY --from=backend /app /app/backend

ENV PORT=3000

CMD node /app/backend/server.js & serve -s public -l $PORT
