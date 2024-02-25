FROM node:20-alpine

RUN npm install -g firebase-tools
CMD [ "firebase", "emulators:start", "--project", "testing", "--import=./data", "--export-on-exit" ]
