import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServiceStatus(): string {
    return 'Payment server running';
  }
}
