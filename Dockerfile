FROM node:16-alpine

LABEL name "Dwii5359 Pelias API"
LABEL maintainer "Dwii5359 <dwiiunknown@gmail.com>"

# Where the app is built and run inside the docker fs
ENV WORK=/home/pelias
WORKDIR ${WORK}

# Copy package.json first to prevent npm install being rerun when only code changes
COPY ./package.json ${WORK}
RUN npm install

# Copy Project
COPY . ${WORK}

# Copy SSL Certificates
COPY ${SSL_CRT_PATH} ${WORK}
COPY ${SSL_KEY_PATH} ${WORK}

# Start the app with node
CMD ["node", "index.js"]