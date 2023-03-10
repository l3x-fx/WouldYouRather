import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import './index.css';
import App from './App';

import { PollList } from './features/polls/PollList';
import { NewPoll } from './features/polls/NewPoll';
import { Login } from './features/auth/Login';
import { Signup } from './features/auth/Signup';
import { Leaderboard } from './features/users/Leaderboard';
import { PollDetails } from './features/polls/PollDetails';
import { Error } from './app/Error';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />, 
    children:[
      {
        index: true,
        element: <PollList />,
      },
      {
        path:"/login",
        element:<Login /> 
      },
      {
        path:"/signup", 
        element: <Signup />
      },      
      {
        path:"/add",
        element:<NewPoll />, 
      },
      {
        path: "/leaderboard",
        element: <Leaderboard
     />
      },
      {
        path: "/questions/:question_id", 
        element: <PollDetails />,
        errorElement: <Error />
      }
      

    ]
  }
])

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>    
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider> 
  </React.StrictMode>
);


reportWebVitals();
