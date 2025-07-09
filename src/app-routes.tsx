import { HomePage, TasksPage, ProfilePage, AccordionPage, ChatPage } from './pages';
import { withNavigationWatcher } from './contexts/navigation-hooks';

const routeData = [
    {
        path: '/tasks',
        element: TasksPage
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    },
    {
        path : '/accordion',
        element: AccordionPage
    },
    {
        path : '/chat',
        element: ChatPage
    }
];

export const routes = routeData.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
