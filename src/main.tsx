import ReactDOM from 'react-dom/client';
import './index.css';
import { InternalLayout } from './features/cats-gallery/pages/internal-layout/internal-layout';
import React from 'react';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { NotFoundPage } from './features/cats-gallery/pages/not-found/not-found-page';

const routes: RouteObject[] = [
  {
    path: '/',
    index: true,
    element: <InternalLayout></InternalLayout>,
  },
  {
    path: '*',
    element: <NotFoundPage></NotFoundPage>
  }
];
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
);
