import { RouteObject, Outlet } from "react-router-dom";
import NavBar from '../components/NavBar'
import App from '../layouts/App';
import Error from '../layouts/Error';
import TableLayout from '../layouts/TableLayout';
import ReduxLayout from '../layouts/ReduxLayout';
import AutocompleteLayout from '../layouts/AutocompleteLayout';
import ReactQueryLayout from '../layouts/ReactQueryLayout';
import MultipartForm from '../layouts/MultipartForm';
import XStateTodo from '../layouts/XStateTodo';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <App />,
        errorElement: <Error />,
      },
      {
        path: "/table",
        element: <TableLayout />,
        errorElement: <Error />,
      },
      {
        path: "/redux",
        element: <ReduxLayout />,
        errorElement: <Error />,
      },
      {
        path: "/autocomplete",
        element: <AutocompleteLayout />,
        errorElement: <Error />,
      },
      {
        path: "/react-query",
        element: <ReactQueryLayout />,
        errorElement: <Error />,
      },
      {
        path: "/multipart-form",
        element: <MultipartForm />,
        errorElement: <Error />,
      },
      {
        path: "/xstate-todo",
        element: <XStateTodo />,
        errorElement: <Error />,
      },
    ]
  },
];

function NavbarWrapper(){
  return (
  <div>
      <NavBar/>
      <Outlet/>
  </div>
  )
};

export default routes;