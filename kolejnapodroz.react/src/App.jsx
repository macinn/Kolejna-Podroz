import './App.css'
import { Layout }  from "./pages/layout/Layout"
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
        </Layout>
  );
}

export default App
