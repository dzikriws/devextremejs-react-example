import { HomePage, TasksPage, ProfilePage, AccordionPage, ChatPage, FormValidatorPage , TextValidatorPage, GalleryPage, FileManagerPage, Table, MapPage } from './pages';
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
    },
    {
        path : '/validator/text',
        element: TextValidatorPage
    },
    {
        path : '/validator/form',
        element: FormValidatorPage
    },
    {
        path : '/map',
        element: MapPage
    },
    {
        path : '/gallery',
        element: GalleryPage
    },
    {
        path : '/file-manager',
        element: FileManagerPage
    },
    {
        path : '/table',
        element: Table
    }
];

export const routes = routeData.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
