import SearchForm from './pages/search/SearchForm'
import ConnectionsList from "./pages/search/ConnectionsList";
import AddForm from './pages/admin/AddForm';
import ProviderForm from './pages/admin/ProviderForm';

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
        path: "/add",
        element: <AddForm />,
    },{
        path: "/add-provider",
        element: <ProviderForm />,
    },
    {
        path: "*",
        element: <SearchForm />,
    },
];

export default AppRoutes;
