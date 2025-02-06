import { Routes } from '@angular/router';
import {authGuard} from './guards/common/auth.guard';
import {loginGuard} from './guards/common/login.guard';

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
      },
      {
        path: "cashback",
        loadComponent: () => import('../app/components/user/cashback/cashback.component').then(c => c.CashbackComponent)
      },
      {
        path: "operation",
        loadComponent: () => import('../app/components/user/transaction/transaction.component').then(c => c.TransactionComponent)
      },
      {
        path: "transaction-product/:transactionId",
        loadComponent: () => import('../app/components/user/transaction-product/transaction-product.component').then(c => c.TransactionProductComponent)
      }
    ],
    canActivate: [authGuard]
  },
  {
    path: "auth",
    loadComponent: () => import('../app/components/auth/layout/layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: "login",
        loadComponent: () => import('../app/components/auth/login/login.component').then(c => c.LoginComponent)
      }
    ],
    canActivate: [loginGuard]
  }
];
