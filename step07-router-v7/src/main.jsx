import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin';
import User from './pages/User.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import Manager from './pages/Manager.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {index : true, element: <Home />},
      {
        path : 'admin', 
        element: <AdminLayout />,
        children: [
          {index : true, element: <Admin />},
          {path : 'manager', element: <Manager />} 
        ]
      },
      {path : 'user/:id', element: <User />},
      {path : '*', element: <NotFound />}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
