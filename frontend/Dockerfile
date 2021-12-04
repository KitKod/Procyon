FROM node:14.17

# set working directory
RUN mkdir /app
WORKDIR /app

# install dependencies
COPY package.json package-lock.json ./
# install angular CLI that matches package one
RUN npm install -g @angular/cli
RUN npm ci
COPY . .

RUN chmod +x ./etc/app/entrypoint.sh

# start app
ENTRYPOINT ["/app/etc/app/entrypoint.sh"]
