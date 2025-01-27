export class EditTransaction {
  id!: string;
  paymentMethodId!: string;
  categoryId!: string;
  stockId?: string;
  amount!: number;
  cashbackAmount!: number;
}
