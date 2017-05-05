FROM nodesource/node:6.0

ADD package.json package.json
RUN npm install
RUN npm install -g webpack
RUN npm run build
ADD . .

CMD ["node", "server/app.js"]