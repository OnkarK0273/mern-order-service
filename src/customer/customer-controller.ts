import { Response, Request } from 'express';
import { CustomerService } from './customer-service';
import { AuthRequest } from '@/common/types';

export class CustomerController {
  constructor(private customerService: CustomerService) {}

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

      return res.json(newCustomer);
    }

    res.json(Customer);
  };
}
