# NodeRED Plataform

## Instruções

### Permissions

Permissões para os arquivos de inicialização para o docker substitua $USER pelo seu usuário.

```bash
sudo chwon -R 1000:1000 data
sudo chmod -R ug+rwx data
```

### Docker Compose

Execute o comando abaixo para subir o docker-compose.

```bash
docker compose up -d
```

### Nodered

Acesse o container do nodered.

```bash
docker exec -it node-red bash
```

Execute o comando abaixo para instalar as dependências do nodered.

```bash
cd /data && npm install
```

Para acessar o nodered acesse o endereço abaixo.

```bash
http://localhost:1880/admin
```
