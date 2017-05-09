FROM nodesource/node:6.0

ENV NODE_ENV=production

COPY package.json .

RUN npm install

ADD crash.sh /

# Copy source code
COPY . .

# Change working directory
WORKDIR .

RUN npm run build

# CMD ["node", "server/app.js"]
CMD /bin/bash /crash.sh