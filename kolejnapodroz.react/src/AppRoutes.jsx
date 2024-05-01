import SearchForm from './pages/search/SearchForm'
import ConnectionsList from "./pages/search/ConnectionsList";
import ConfirmationPage from "./pages/confirmation/ConfirmationPage.jsx";
import TicketsHistoryPage from "./pages/history/ticketsHistoryPage";
import TripDetailsPage from "./pages/details/tripDetails.jsx";
import AddForm from './pages/admin/AddForm';
import ProviderForm from './pages/admin/ProviderForm';
import StationForm from './pages/admin/StationForm';
import LoginPage from './pages/login/LoginPage'; 


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

        path: "/confirmation",
        element: <ConfirmationPage />,
    },
    {
        path: "/history",
        element: <TicketsHistoryPage />,
    },
    {
        path: "/details",
        element: <TripDetailsPage />,
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
    {
        path: '/login-page',
        element: <LoginPage />,
    },
];

export default AppRoutes;
