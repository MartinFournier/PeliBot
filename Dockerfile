FROM node

# First copy the npm package files to install dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm install

# And then copy the remaining app files
COPY . /app
CMD ["npm", "start"]
