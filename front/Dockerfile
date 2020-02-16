FROM node:11

# Create app directory
WORKDIR /opt/tbp/front/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN rm -rf node_modules
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN npm run build

EXPOSE 3000
