FROM node:14.17

# set working directory
RUN mkdir /app
WORKDIR /app

# install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

RUN chmod +x ./etc/app/entrypoint.sh

# start app
ENTRYPOINT ["/app/etc/app/entrypoint.sh"]
