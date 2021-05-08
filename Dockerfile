FROM node:14.16.0 

WORKDIR /Users/decagon/Desktop/tasks/week-7-node-007-RexKizzy22/Crud

COPY ./ ./

RUN yarn 

CMD ["/bin/bash"]