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
      }
    ]
  }
];
