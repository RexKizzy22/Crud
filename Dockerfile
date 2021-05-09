FROM node:14.16.0 

WORKDIR /Users/Crud 

COPY package.json yarn* ./

RUN yarn 

COPY ./ ./


CMD ["/bin/bash"]