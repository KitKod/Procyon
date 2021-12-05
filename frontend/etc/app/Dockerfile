FROM node:14.17

ARG APP_DIR
ENV APP_DIR=${APP_DIR}
# set working directory
RUN mkdir $APP_DIR
WORKDIR $APP_DIR

# install dependencies
COPY package.json package-lock.json ./
# install angular CLI that matches package one
RUN npm install -g @angular/cli
RUN npm ci
RUN npx ngcc
COPY . .

RUN chmod +x ./etc/app/entrypoint.sh

# start app
ENTRYPOINT ["/bin/bash", "-c", "exec ${APP_DIR}/etc/app/entrypoint.sh \"${@}\"", "--" ]
