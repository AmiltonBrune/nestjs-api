# Usa imagem leve com Node.js
FROM node:20-alpine

# Define diretório da aplicação
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm ci --omit=dev

# Copia o restante dos arquivos do projeto
COPY . .

# Compila o projeto com TypeScript
RUN npx tsc -p tsconfig.build.json

# Expõe a porta da aplicação
EXPOSE 8000

# Comando para iniciar a aplicação em modo produção
CMD ["node", "dist/main"]
