import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Store/Store'; // <-- your Redux store
import App from './App';  // <-- your main App component
import './index.css'; 
import routes from './route';
import {createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter(routes)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
