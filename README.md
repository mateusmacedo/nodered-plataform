# node-red Plataform

## Instruções

### Permissions

Permissões para os arquivos de inicialização para o docker substitua $USER pelo seu usuário.

```bash
sudo chown -R $USER:$USER data
sudo chmod -R ug+rwx data
```

### Container Folder

📦container
 ┣ 📂base
 ┃ ┣ 📂scripts
 ┃ ┃ ┣ 📜entrypoint.sh
 ┃ ┃ ┣ 📜install_devtools.sh
 ┃ ┃ ┗ 📜remove_native_gpio.sh
 ┃ ┣ 📜Dockerfile
 ┃ ┣ 📜ecosystem.config.js
 ┃ ┣ 📜flows.json
 ┃ ┣ 📜healthcheck.js
 ┃ ┣ 📜known_hosts.sh
 ┃ ┣ 📜package.json
 ┃ ┗ 📜settings.js
 ┣ 📂build
 ┃ ┗ 📜Dockerfile
 ┣ 📜.env
 ┗ 📜compose.yaml

#### Docker Network

Para criar a rede do docker execute o comando abaixo.

```bash
docker network create --driver bridge shared
```

#### Docker Compose

Execute o comando abaixo para subir o docker-compose.

```bash
docker compose up -d -f container/compose.yml
```

#### Environment Variables

Para alterar as variáveis de ambiente do node-red acesse o arquivo .env. dentro da pasta container.

```bash
TZ= 'America/Sao_Paulo'
FLOW_FILE_PRETTY= 'true'
NODE_RED_ENABLE_PROJECTS= 'true'
NODE_RED_ENABLE_SAFE_MODE= 'true'
NODE_RED_LOG_LEVEL= 'debug'
NODE_RED_ADMIN_ROOT= '/admin'
NODE_RED_HTTP_NODE_ROOT= '/api'
NODE_RED_ENABLE_EXTERNAL_MODULES_AUTO_INSTALL= 'true'
NODE_RED_ENABLE_EXTERNAL_MODULES_PALETTE_INSTALL= 'true'
NODE_RED_ENABLE_EXTERNAL_MODULES_PALETTE_UPDATE= 'true'
NODE_RED_ENABLE_EXTERNAL_MODULES_PALETTE_UPLOAD= 'true'
NODE_RED_ENABLE_AUDIT= 'true'
NODE_RED_ENABLE_METRICS= 'true'
NODE_RED_ENABLE_STATE_UI= 'true'
NODE_RED_ENABLE_STATE= 'true'
NODE_RED_ENABLE_DIAGNOSTICS= 'true'
NODE_RED_ENABLE_DIAGNOSTICS_UI= 'true'
DOCKER_BUILD_NO_CACHE= 'true'
```

#### Build Docker

Para construir a imagem do node-red temos o arquivo Dockerfile dentro da pasta build/container. Execute o comando abaixo para construir a imagem.

```bash
docker build -t node-red:latest -f container/Dockerfile .
```

##### Base Build

Dentro do diretório container/base temos o arquivo Dockerfile para construir a imagem base junto com outros assets.

### node-red

Acesse o container do node-red.

```bash
docker exec -it node-red bash
```

Execute o comando abaixo para instalar as dependências do node-red.

```bash
cd /data && npm install
```

Para acessar o node-red acesse o endereço abaixo.

```bash
http://localhost:1880/admin
```
