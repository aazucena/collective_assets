
import HomePage from '../pages/home.f7';
import LoadingPage from '../pages/loading.f7';
import MenuPage from '../pages/main_menu.f7';
import NotFoundPage from '../pages/404.f7';

var routes = [
  {
    name: 'home',
    path: '/',
    component: HomePage,
  },
  {
    name: 'main_menu',
    path: '/menu/',
    component: MenuPage,
  },
  {
    name: 'loading',
    path: '/loading/',
    component: LoadingPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;