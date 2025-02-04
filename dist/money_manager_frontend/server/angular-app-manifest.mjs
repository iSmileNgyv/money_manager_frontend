
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/category"
  },
  {
    "renderMode": 2,
    "route": "/image"
  },
  {
    "renderMode": 2,
    "route": "/product"
  },
  {
    "renderMode": 2,
    "route": "/payment-method"
  },
  {
    "renderMode": 2,
    "route": "/stock"
  },
  {
    "renderMode": 2,
    "route": "/cashback"
  },
  {
    "renderMode": 2,
    "route": "/operation"
  },
  {
    "renderMode": 2,
    "route": "/auth"
  },
  {
    "renderMode": 2,
    "route": "/auth/login"
  }
],
  assets: {
    'index.csr.html': {size: 15411, hash: 'e19060ab6ceb439f0946ae405e17ed43b796efc1b1d841a5cee664fa6cb7cb74', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 11713, hash: '8d9c0bbf507f5193e1286a92a302d9f1d16ae5659a364f1393478b986b0195ed', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'image/index.html': {size: 16282, hash: 'd7bc8c253188ec44ebbc09aaf0fba4eae4cf094a978ab2586b26652d70f8b72c', text: () => import('./assets-chunks/image_index_html.mjs').then(m => m.default)},
    'category/index.html': {size: 16282, hash: 'd7bc8c253188ec44ebbc09aaf0fba4eae4cf094a978ab2586b26652d70f8b72c', text: () => import('./assets-chunks/category_index_html.mjs').then(m => m.default)},
    'index.html': {size: 16282, hash: 'd7bc8c253188ec44ebbc09aaf0fba4eae4cf094a978ab2586b26652d70f8b72c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'product/index.html': {size: 16282, hash: 'd7bc8c253188ec44ebbc09aaf0fba4eae4cf094a978ab2586b26652d70f8b72c', text: () => import('./assets-chunks/product_index_html.mjs').then(m => m.default)},
    'payment-method/index.html': {size: 16282, hash: 'd7bc8c253188ec44ebbc09aaf0fba4eae4cf094a978ab2586b26652d70f8b72c', text: () => import('./assets-chunks/payment-method_index_html.mjs').then(m => m.default)},
    'stock/index.html': {size: 16282, hash: 'd7bc8c253188ec44ebbc09aaf0fba4eae4cf094a978ab2586b26652d70f8b72c', text: () => import('./assets-chunks/stock_index_html.mjs').then(m => m.default)},
    'cashback/index.html': {size: 16282, hash: 'd7bc8c253188ec44ebbc09aaf0fba4eae4cf094a978ab2586b26652d70f8b72c', text: () => import('./assets-chunks/cashback_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 16345, hash: '13052478af9acbc4a2b19d9f9be0df1f0e4cf2193df5a01644b8049a55c940fa', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'operation/index.html': {size: 16282, hash: 'd7bc8c253188ec44ebbc09aaf0fba4eae4cf094a978ab2586b26652d70f8b72c', text: () => import('./assets-chunks/operation_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 17222, hash: 'ac84ca00614bce18a5b03c25181626ecef292cd53e9bd1d04f1474b362aa1f6b', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'styles-SYBYNO6S.css': {size: 29083, hash: 'TCuNzqdTWcY', text: () => import('./assets-chunks/styles-SYBYNO6S_css.mjs').then(m => m.default)}
  },
};
