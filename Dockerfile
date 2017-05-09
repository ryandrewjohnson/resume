FROM nodesource/node:6.0

ENV NODE_ENV=production

COPY package.json .

RUN npm install

# Copy source code
COPY . .

# Change working directory
WORKDIR .

RUN npm run build

# see https://nodesource.com/blog/8-protips-to-start-killing-it-when-dockerizing-node-js/
ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

CMD ["dumb-init", "node", "server/app.js"]