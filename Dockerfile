FROM node:18

WORKDIR /app

# نصب serve برای سرو HTML
RUN npm install -g serve

# کپی فایل‌ها
COPY server.js .
COPY package*.json .
COPY index.html .

RUN npm install

ENV PORT=3000

# اجرای بک‌اند + سرو HTML
CMD node server.js & serve -s . -l $PORT
