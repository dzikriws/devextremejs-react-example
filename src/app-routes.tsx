import { HomePage, TasksPage, CompanyEmployeeTable, HtmlEditorPage, ProfilePage, AccordionPage, TextBoxPage,CompanyTable, ChatPage, FormValidatorPage , TextValidatorPage, GalleryPage, FileManagerPage, Table as EmployeeTable, MapPage, TileViewPage } from './pages';
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
        path : '/text-box',
        element: TextBoxPage
    },
	{
		path : '/chat',
		element: ChatPage
	},
    {
        path : '/html-editor',
        element: HtmlEditorPage
    },
	{
		path: '/tile',
        element: TileViewPage
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
		path : '/employee-table',
		element: EmployeeTable
	},
	{
		path : '/company-table',
		element: CompanyTable
	},
	{
		path : '/company-employee-table',
		element: CompanyEmployeeTable
	}
];

export const routes = routeData.map(route => {
	return {
		...route,
		element: withNavigationWatcher(route.element, route.path)
	};
});
