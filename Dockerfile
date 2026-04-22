FROM node:22-slim

WORKDIR /app

# Install OpenSSL (required for Prisma)
RUN apt-get update -y && apt-get install -y openssl

# Copy dependency files first
COPY package*.json ./

# Install dependencies WITHOUT running scripts (prevents early prisma generate)
RUN npm install --ignore-scripts

# Copy full project (including prisma schema)
COPY . .

# Now safely generate Prisma client
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3000"]

