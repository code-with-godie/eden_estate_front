import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from '../pages/home/Home';
import Contacts from '../pages/contacts/Contacts';
import About from '../pages/about/About';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import AuthLayout from './layout/AuthLayout';
import Profile from '../pages/profile/Profile';
import SinglePost from '../pages/single/SinglePost';
import Search from '../pages/search/Search';
import ProtectedLayout from './layout/ProtectedLayout';
import CreatePost from '../pages/new/CreatePost';
import UpdateUser from '../pages/update/UpdateDetails';
import NewRoom from '../pages/new/NewRoom';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/contacts',
        element: <Contacts />,
      },

      {
        path: '/p/:postID',
        element: <SinglePost />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
        ],
      },
      {
        path: '/',
        element: <ProtectedLayout />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
          {
            path: '/new/post',
            element: <CreatePost />,
          },
          {
            path: '/update/details',
            element: <UpdateUser />,
          },
          {
            path: '/new/room/:hotelId',
            element: <NewRoom />,
          },
        ],
      },
    ],
  },
]);
