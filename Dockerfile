FROM node:alpine

# Define o diretório de trabalho
WORKDIR /app

# Instala o PM2 e as dependências do projeto
RUN npm install --global pm2 \
    && npm install --production

# Copia apenas os arquivos de dependências
COPY ./package*.json ./

# Atualiza e ajusta dependências antes de copiar o restante
RUN npm update && npm audit fix --force

# Copia todo o código após as dependências serem instaladas
COPY ./ ./

# Constrói a aplicação
RUN npm run build

# Define a porta exposta
EXPOSE 3000

# Define o usuário que executará o processo
USER node

# Define o comando inicial da aplicação
CMD [ "pm2-runtime", "npm", "--", "start" ]
