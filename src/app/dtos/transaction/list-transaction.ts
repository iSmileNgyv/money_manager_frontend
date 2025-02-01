export class ListTransaction {
  id!: string;
  paymentMethodId!: string;
  paymentMethodName!: string;
  paymentMethodImage?: string;
  categoryId!: string;
  categoryName!: string;
  categoryImage?: string;
  stockId?: string;
  stockName?: string;
  stockImage?: string;
  amount!: number;
  cashbackAmount!: number;
  eventDate!: Date;
}
