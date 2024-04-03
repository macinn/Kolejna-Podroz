import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchForm from './pages/search/SearchForm'
import ConnectionsList from "./pages/search/ConnectionsList";

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
        {
          path: "/",
          element: <SearchForm />,
        },
        {
          path: "/connections",
          element: <ConnectionsList />,
        },
        {
          path: "*",
          element: <SearchForm />,
        },
      

  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App
