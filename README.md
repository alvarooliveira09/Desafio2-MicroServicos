# Desafio 2 - Micro Serviços

## a) Resultado esperado: Aplicativo funcional, com as seguintes funcionalidades:
  1. Serviço de pagamento sendo executado de forma independente do serviço de notificação;
  2. Serviço de notificação sendo executado de forma independente do serviço de pagamento;
  3. Comunicação assíncrona entre os serviços por meio de uma mensageria;
  4. Execução do fluxo de processamento para a solicitação de transação de um pagamento:

     I. Sistema de pagamento armazena dados da transação com status pendente;
     [>>I.SourceCode](https://github.com/alvarooliveira09/Desafio2-MicroServicos/blob/959a7cf6cb946669d90c019fd82271e86def8228/payment/src/credit-card/credit-card.service.ts#L15)

     II. Sistema de pagamento publica mensagem na fila para sistema de notificação informar sobre o recebimento da solicitação de transação;
     [>>II.SourceCode](https://github.com/alvarooliveira09/Desafio2-MicroServicos/blob/959a7cf6cb946669d90c019fd82271e86def8228/payment/src/credit-card/credit-card.service.ts#L18)

     III. Sistema de notificação lê mensagem na fila e envia notificação ao usuário sobre o recebimento da solicitação de transação;
     [>>III.SourceCode](https://github.com/alvarooliveira09/Desafio2-MicroServicos/blob/959a7cf6cb946669d90c019fd82271e86def8228/notification/src/mail/mail.controller.ts#L35)
     
     IV. Sistema de pagamento confirma a transação, atualiza o status para sucesso;
     [>>IV.SourceCode](https://github.com/alvarooliveira09/Desafio2-MicroServicos/blob/959a7cf6cb946669d90c019fd82271e86def8228/payment/src/credit-card/credit-card.service.ts#L29)

     V. Sistema de pagamento publica mensagem na fila para sistema de notificação informar sobre a confirmação da transação;
     [>>V.SourceCode](https://github.com/alvarooliveira09/Desafio2-MicroServicos/blob/959a7cf6cb946669d90c019fd82271e86def8228/payment/src/credit-card/credit-card.service.ts#L39)

     VI. Sistema de notificação lê mensagem na fila e envia notificação ao usuário sobre a confirmação da transação.
     [>>VI.SourceCode](https://github.com/alvarooliveira09/Desafio2-MicroServicos/blob/959a7cf6cb946669d90c019fd82271e86def8228/notification/src/mail/mail.controller.ts#L58)
     
## b) Instruções de execução:

1. Tenha instalado previamente os aplicativos Docker ([docker.com](https://www.docker.com/)) e o WebStorm ([jetbrains.com/webstorm/download](https://www.jetbrains.com/webstorm/download/)).

2. Realize download dos arquivos deste repositório.
   
3. Docker containers:
      - Faça o seguinte no projeto 'payment':
        -   ➜ Clique com o botão direito do mouse sobre o arquivo docker-postgres.yml e selecione Run 'docker/docker-postgr...'
        -   ➜ Clique com o botão direito do mouse sobre o arquivo docker-rabbit.yml e selecione Run 'docker/docker-rabbit...'
        
4. Abra a pasta do projeto 'payment' utilizando o [Jetbrains WebStorm](https://www.jetbrains.com/webstorm/) e execute os seguintes comandos no terminal:
```bash
  npm install
  npx prisma generate
  npx prisma migrate deploy
```

5. Abra a pasta do projeto 'notification' utilizando o [Jetbrains WebStorm](https://www.jetbrains.com/webstorm/), **em uma segunda janela**, e execute os seguintes comandos no terminal:
```bash
  npm install
  npx prisma generate
  npx prisma migrate deploy
```

6. Execute o comando abaixo no terminal do projeto payment **e depois** no terminal do projeto notification:
```bash
  npm run start
```
## c) Verifique os registros no banco de dados
1. Registrar o servidor no PostgreSQL pgAdmin
    - Acesse o seguinte endereço: [http://localhost:15432/browser/](http://localhost:15432/browser/) em um navegador
    - Após abrir o link acima, faça login com o usuário: root@root.com e senha: root
    - clique em Add New Server e preencha conforme descrito abaixo, após clique no botão Save:
    -   ➜ Guia General: Name = db
    -   ➜ Guia Connection: Host name/address = host.docker.internal
    -   ➜ Guia Connection: Username = postgres, Password = root

2. Tabela CreditCard no banco de dados 'payment'
3. Tabela Mail no banco de dados 'notification'
   
## d) Realize testes utilizando o [Insomnia](https://insomnia.rest/) ou o [Postman](https://www.postman.com/)
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
