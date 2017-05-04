FROM nodesource/node:6.0

ADD package.json package.json
RUN npm install
ADD . .

CMD ["node", "node/app.js"]