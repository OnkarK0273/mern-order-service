import { Response, Request } from 'express';
import { CustomerService } from './customer-service';
import { AuthRequest } from '@/common/types';
import { Logger } from 'winston';

export class CustomerController {
  constructor(
    private customerService: CustomerService,
    private logger: Logger,
  ) {}

  getCustomer = async (req: Request, res: Response) => {
    const _req = req as AuthRequest;
    const { sub: userId, firstName, lastName, email } = _req.auth;

    const Customer = await this.customerService.getById(userId);

    if (!Customer) {
      const newCustomer = await this.customerService.createCustomer({
        userId,
        firstName,
        lastName,
        email,
        addresses: [],
      });
      this.logger.info(`get Customer`, { id: newCustomer?._id });
      return res.json(newCustomer);
    }
    this.logger.info(`get Customer`, { id: Customer?._id });
    res.json(Customer);
  };

  addAddress = async (req: Request, res: Response) => {
    const _req = req as AuthRequest;
    const { sub: userId } = _req.auth;
    const customerId = req.params.id as string;
    const { address } = req.body as { address: string };

    const customer = await this.customerService.updateAddress(userId, customerId, address);
    this.logger.info(`Created address`, { id: customer?._id });
    res.json(customer);
  };
}
