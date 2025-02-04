
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
    'index.csr.html': {size: 15411, hash: '8d1e8f6f7c7260a0f3eb851f65f27739616fe4987a527095893084d186768695', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 11713, hash: '0cec1a187b62c3a6c178f685e3d53685a93bddb4dbb27d9839778a1c7a60556a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'category/index.html': {size: 16282, hash: '910060bc120d35325f553ed2705595cb76a3ee043ab03c0c8e3a7619afe65850', text: () => import('./assets-chunks/category_index_html.mjs').then(m => m.default)},
    'index.html': {size: 16282, hash: '910060bc120d35325f553ed2705595cb76a3ee043ab03c0c8e3a7619afe65850', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'payment-method/index.html': {size: 16282, hash: '910060bc120d35325f553ed2705595cb76a3ee043ab03c0c8e3a7619afe65850', text: () => import('./assets-chunks/payment-method_index_html.mjs').then(m => m.default)},
    'product/index.html': {size: 16282, hash: '910060bc120d35325f553ed2705595cb76a3ee043ab03c0c8e3a7619afe65850', text: () => import('./assets-chunks/product_index_html.mjs').then(m => m.default)},
    'cashback/index.html': {size: 16282, hash: '910060bc120d35325f553ed2705595cb76a3ee043ab03c0c8e3a7619afe65850', text: () => import('./assets-chunks/cashback_index_html.mjs').then(m => m.default)},
    'stock/index.html': {size: 16282, hash: '910060bc120d35325f553ed2705595cb76a3ee043ab03c0c8e3a7619afe65850', text: () => import('./assets-chunks/stock_index_html.mjs').then(m => m.default)},
    'operation/index.html': {size: 16282, hash: '910060bc120d35325f553ed2705595cb76a3ee043ab03c0c8e3a7619afe65850', text: () => import('./assets-chunks/operation_index_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 16345, hash: '8db596a86ad6b353970f2415b86c8a97c810bdd23fa0b512142bebbc6fb10e3e', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'image/index.html': {size: 16282, hash: '910060bc120d35325f553ed2705595cb76a3ee043ab03c0c8e3a7619afe65850', text: () => import('./assets-chunks/image_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 17222, hash: '1b8c2f1901d94a8886ffd8a40913be2ca1d2a911cb0e0e1168d124a6d2d7aa50', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'styles-SYBYNO6S.css': {size: 29083, hash: 'TCuNzqdTWcY', text: () => import('./assets-chunks/styles-SYBYNO6S_css.mjs').then(m => m.default)}
  },
};
