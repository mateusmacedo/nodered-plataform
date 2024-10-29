# node-red Plataform

## Instruções

### Permissions

Permissões para os arquivos de inicialização para o docker substitua $USER pelo seu usuário.

```bash
sudo chwon -R $USER:$USER src
sudo chmod -R ug+rwx src
```

### Docker Compose

Execute o comando abaixo para subir o docker-compose.

```bash
docker compose up -d
```

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
