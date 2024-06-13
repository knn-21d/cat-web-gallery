import { RouteObject } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { RegisterPage } from './features/auth/pages/register-page/register-page';

export const routes: RouteObject[] = [
	{
		path: '/login',
		element: <LoginPage></LoginPage>,
	},
    {
        path: '/register',
        element: <RegisterPage></RegisterPage>
    }
];
