FROM node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system one-one && \
    adduser --system -G one-one one-one

COPY dist ./one-one/
COPY package.json ./one-one/
RUN chown -R one-one:one-one ./one-one

RUN npm --prefix ./one-one --omit=dev -f install

USER one-one

CMD [ "node", "one-one" ]