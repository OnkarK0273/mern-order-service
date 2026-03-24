import customerModel from './customer-model';
import { Customer } from './customer-types';

export class CustomerService {
  async getById(userId: string) {
    return await customerModel.findOne({ userId });
  }

  async createCustomer(customer: Customer) {
    return await customerModel.create(customer);
  }
}
