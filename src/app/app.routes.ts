import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('../app/components/user/layouts/layouts.component').then(c => c.LayoutsComponent),
    children: [
      {
        path: "",
        loadComponent: () => import('../app/components/user/home/home.component').then(c => c.HomeComponent)
      },
      {
        path: "category",
        loadComponent: () => import('../app/components/user/category/category.component').then(c => c.CategoryComponent)
      },
      {
        path: "image",
        loadComponent: () => import('../app/components/user/image/image.component').then(c => c.ImageComponent)
      },
      {
        path: "product",
        loadComponent: () => import('../app/components/user/product/product.component').then(c => c.ProductComponent)
      },
      {
        path: "payment-method",
        loadComponent: () => import('../app/components/user/payment-method/payment-method.component').then(c => c.PaymentMethodComponent)
      },
      {
        path: "stock",
        loadComponent: () => import('../app/components/user/stock/stock.component').then(c => c.StockComponent)
      }
    ]
  }
];
