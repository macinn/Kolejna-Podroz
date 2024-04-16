import SearchForm from './pages/search/SearchForm'
import ConnectionsList from "./pages/search/ConnectionsList";
import AddForm from './pages/admin/AddForm';
import ProviderForm from './pages/admin/ProviderForm';
import StationForm from './pages/admin/StationForm';

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
        path: "/add-connection",
        element: <AddForm />,
    },
    {
        path: "/add-provider",
        element: <ProviderForm />,
    },
    {
        path: "/add-station",
        element: <StationForm />,
    },
    {
        path: "*",
        element: <SearchForm />,
    },
];

export default AppRoutes;
