import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import AppLayout from './components/AppLayout';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './components/Body';

const Grocery = lazy(() => import('./components/Grocery'));
const About = lazy(() => import('./components/About'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Body /> },
      {
        path: '/about',
        element: (
          <Suspense fallback={<h1>Loading the about page.</h1>}>
            <About />
          </Suspense>
        ),
      },
      { path: '/contact', element: <Contact /> },
      {
        path: '/grocery',
        element: (
          <Suspense
            fallback={
              <div>
                <h1>Loading ... Grocery Store</h1>
              </div>
            }
          >
            <Grocery />
          </Suspense>
        ),
      },
      { path: '/restaurant/:restId', element: <RestaurantMenu /> },
      { path: '/cart', element: <Cart /> },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
