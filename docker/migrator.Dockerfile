FROM node:18-alpine

# copy prisma files to migrator
COPY prisma ./prisma

ENV NODE_ENV=production
RUN yarn add prisma

RUN addgroup --system --gid 1001 anfragensystem
RUN adduser --system --uid 1001 anfragensystem
USER anfragensystem

CMD ["sh", "-c", "yarn prisma migrate deploy"]