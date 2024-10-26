# Desenvolvimento de Sistemas Móveis e Distribuídos
Desafio 2 - Micro Serviços

## a) Instalação (Windows):

1. Tenha instalado previamente os aplicativos [Docker](https://www.docker.com/) e o [Jetbrains WebStorm](https://www.jetbrains.com/webstorm/).

2. Abra a pasta do projeto 'payment' utilizando o [Jetbrains WebStorm](https://www.jetbrains.com/webstorm/).

3. Execute os seguintes comandos no terminal:
```bash
  npm install
  npx prisma generate
  npx prisma migrate deploy
```
4. Repita os passos 1. e 2. para o projeto 'notification', abrindo o projeto em uma segunda janela.
   
5. Docker containers
      - Execute os comandos abaixo no projeto 'payment':
        -   ➜ Clique com o botão direito do mouse sobre o arquivo docker-postgres.yml e selecione Run 'docker/docker-postgr...'
        -   ➜ Clique com o botão direito do mouse sobre o arquivo docker-rabbit.yml e selecione Run 'docker/docker-rabbit...'

6. Execute o comando abaixo no terminal do projeto payment e em seguida no terminal do projeto notification:
```bash
  npm run start
```

## b) Teste o projeto utilizando o [Insomnia](https://insomnia.rest/) ou o [Postman](https://www.postman.com/)
+ Requisição HTTP para verificar o status:
```bash
### Expect code 200 OK { message: 'Payment server running'}
GET localhost:3000/

### Expect code 200 OK { message: 'Notification server running'}
GET localhost:3001/
```
+ Requisição HTTP registrar um pagamento:
```bash
POST localhost:3000/credit-card/send
{
  "idUser": "10",
  "orderNumber": 100,
  "orderValue": 1000.00
}
```
## c) Verifique os registros no banco de dados utilizando o PostgreSQL pgAdmin
1. Registrar o servidor no pgAdmin
    - Acesse o seguinte endereço: [http://localhost:15432/browser/](http://localhost:15432/browser/) em um navegador
    - Após abrir o link acima, clique em Add New Server e preencha conforme descrito abaixo, após clique no botão Save:
    -   ➜ Guia General: Name = db
    -   ➜ Guia Connection: Host name/address = host.docker.internal
    -   ➜ Guia Connection: Username = postgres, Password = root

2. Tabela CreditCard no banco de dados 'payment'
3. Tabela Mail no banco de dados 'notification'

