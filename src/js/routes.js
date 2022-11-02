
import HomePage from '../pages/home.f7';
import LoadingPage from '../pages/loading.f7';
import MenuPage from '../pages/main_menu.f7';
import SettingsPage from '../pages/settings.f7';
import CollectionsPage from '../pages/collections.f7';
import HistoryPage from '../pages/history.f7';
import PlayPage from '../pages/play/index.f7';
import PlayResultPage from '../pages/play/result.f7';
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
    name: 'settings',
    path: '/settings/',
    component: SettingsPage,
  },
  {
    name: 'collections',
    path: '/collections/',
    component: CollectionsPage,
  },
  {
    name: 'play',
    path: '/play/',
    component: PlayPage,
  },
  {
    name: 'result',
    path: '/result/',
    component: PlayResultPage,
  },
  {
    name: 'history',
    path: '/history/',
    component: HistoryPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;