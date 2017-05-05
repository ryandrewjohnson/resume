FROM nodesource/node:6.0

ADD package.json package.json
RUN npm install
RUN npm run build
ADD . .

CMD ["node", "server/app.js"]