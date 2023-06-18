const router = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: '@/pages/index' },
  { path: '*', component: '@/pages/docs.tsx' },
];
export default router;
