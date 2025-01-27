export class ListTransaction {
  id!: string;
  paymentMethodId!: string;
  paymentMethodName !: string;
  categoryId!: string;
  categoryName!: string;
  stockId?: string;
  stockName?: string;
  amount!: number;
  cashbackAmount!: number;
}
