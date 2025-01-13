export class ListProduct {
  id!: string;
  name!: string;
  image!: string;
  price!: number;
  description?: string;
  categoryId!: string;
  categoryName!: string;
  createdDate!: Date;
}
