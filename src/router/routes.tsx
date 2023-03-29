import { RouteObject } from "react-router-dom";
import App from '../layouts/App';
import Error from '../layouts/Error';
import TableLayout from '../layouts/TableLayout';

const routes: RouteObject[] = [
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

];

export default routes;