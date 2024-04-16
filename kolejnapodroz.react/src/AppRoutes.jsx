import SearchForm from './pages/search/SearchForm'
import ConnectionsList from "./pages/search/ConnectionsList";
import ConfirmationPage from "./pages/confirmation/ConfirmationPage.jsx";
import TicketsHistoryPage from "./pages/history/ticketsHistoryPage";
import TripDetailsPage from "./pages/details/tripDetails.jsx";

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
        path: "*",
        element: <SearchForm />,
    },
];

export default AppRoutes;
