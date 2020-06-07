FROM node:10

RUN npm install --global pm2

COPY . /opt/analysis-ui

WORKDIR /opt/analysis-ui

RUN rm ./node_modules -rf

RUN yarn

EXPOSE 3000

RUN yarn build

CMD [ "pm2-runtime", "npm", "--", "start" ]

