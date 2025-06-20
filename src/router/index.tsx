import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ManageLayout from '@/layouts/ManageLayout';
import QuestionLayout from '@/layouts/QuestionLayout';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Register from '@/pages/register';
import NotFound from '@/pages/not-found';
import List from '@/pages/manage/list';
import Trash from '@/pages/manage/trash';
import Star from '@/pages/manage/star';
import { lazy } from 'react';

const Operation = lazy(() => import('@/pages/question/operation'));
const Stat = lazy(() => import('@/pages/question/stat'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'operation/:id',
        element: <Operation />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
]);

export default router;
