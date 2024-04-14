import SearchForm from './pages/search/SearchForm'
import ConnectionsList from "./pages/search/ConnectionsList";

const AppRoutes = [
    {
        index: true,
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
];

export default AppRoutes;
