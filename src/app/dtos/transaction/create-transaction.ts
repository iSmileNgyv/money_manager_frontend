export class CreateTransaction {
  paymentMethodId!: string;
  categoryId!: string;
  stockId?: string;
  amount!: number;
  cashbackAmount!: number;
}
