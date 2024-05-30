FROM node:21-alpine

WORKDIR /app/
COPY package.json .
RUN npm install
COPY . .

ENTRYPOINT ["npm"]
CMD ["start"]

STOPSIGNAL SIGKILL
EXPOSE 3000

