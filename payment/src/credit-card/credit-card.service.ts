import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreditCard, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CreditCardService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NOTIFICATION_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  async create(data: Prisma.CreditCardCreateInput): Promise<CreditCard> {
    //I.  Sistema de pagamento armazena dados da transação com status pendente;
    const creditCard = await this.prisma.creditCard.create({ data });

    //II. Sistema de pagamento publica mensagem na fila para sistema de
    //    notificação informar sobre o recebimento da solicitação de transação;
    this.sendRegisterPaymentNotification(JSON.stringify(creditCard));

    this.processPayment(creditCard);

    return creditCard;
  }

  async processPayment(payment: CreditCard) {
    setTimeout(async () => {
      //IV. Sistema de pagamento confirma a transação, atualiza o status para sucesso;
      const creditCard = await this.prisma.creditCard.update({
        where: {
          id: payment.id,
        },
        data: {
          paymentConfirmed: true,
        },
      });

      //V. Sistema de pagamento publica mensagem na fila para sistema de
      //   notificação informar sobre a confirmação da transação;
      this.sendConfirmationPaymentNotification(JSON.stringify(creditCard));
    }, 10000);
  }

  sendRegisterPaymentNotification(message: string) {
    try {
      this.rabbitClient.emit('register', {
        id: randomUUID(),
        data: { notification: message },
      });
    } catch (error) {
      console.error(error);
    }
  }

  sendConfirmationPaymentNotification(message: string) {
    try {
      this.rabbitClient.emit('confirmation', {
        id: randomUUID(),
        data: { notification: message },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
