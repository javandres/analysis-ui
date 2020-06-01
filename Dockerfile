FROM node:10

ENV VERSION=v2.0.0

#WORKDIR /opt/analysis-ui

# Installing dependencies
#COPY package*.json ./


# Copying source files
#COPY . .

#RUN npm install
# Building app
#RUN npm run build

#EXPOSE 3000

# Running the app
#CMD [ "npm", "run", "start" ]


RUN apt-get update && \
    apt-get install -y --no-install-recommends gettext-base && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm i -g serve

#RUN git clone https://github.com/ibi-group/datatools-ui.git /opt/datatools-ui

COPY . /opt/analysis-ui

WORKDIR /opt/analysis-ui

#ADD ./config/*.yml /config/
RUN rm ./node_modules -rf

RUN yarn

#COPY /config/settings.yml /opt/datatools-ui/configurations/default/settings.yml

EXPOSE 3000

#CMD envsubst < /config/env.yml > /opt/datatools-ui/configurations/default/env.yml && \
#    $(npm bin)/mastarm build --env production && serve -p 9966
RUN yarn build

CMD [ "yarn",  "start" ]

