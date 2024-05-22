import React from 'react'; // Upewnij się, że React jest zaimportowany
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/SearchFormStore';
import ConfirmationPage from './ConfirmationPage';
import '@testing-library/jest-dom';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../../stores/SearchFormStore', () => ({
    useStore: jest.fn(),
}));

jest.mock('@auth0/auth0-react');

describe('ConfirmationPage', () => {
    beforeEach(() => {
        useNavigate.mockImplementation(() => jest.fn());
        useStore.mockImplementation(() => ({
            selectedConnection: {
                from: { name: "City A" },
                destination: { name: "City B" },
                departureTime: "2024-05-20T12:00:00",
                arrivalTime: "2024-05-20T14:00:00",
                provider: { name: "PKP" }
            }
        }));
    });

    test('Display labels', () => {
        render(
            <BrowserRouter>
                <ConfirmationPage />
            </BrowserRouter>
        );

        expect(screen.getByText(/Connection/i)).toBeInTheDocument();
        expect(screen.getByText(/Time of departure/i)).toBeInTheDocument();
        expect(screen.getByText(/Time of arrival/i)).toBeInTheDocument();
        expect(screen.getByText(/Departure date/i)).toBeInTheDocument();
        expect(screen.getByText(/Provider/i)).toBeInTheDocument();
    });

    test('Display mocked data', () => {
        render(
            <BrowserRouter>
                <ConfirmationPage />
            </BrowserRouter>
        );

        expect(screen.getByText("City A")).toBeInTheDocument();
        expect(screen.getByText("City B")).toBeInTheDocument();
        //expect(screen.getByText("20.05.2024")).toBeInTheDocument();
        //expect(screen.getByText("12:00")).toBeInTheDocument();
        //expect(screen.getByText("14:00")).toBeInTheDocument();
        expect(screen.getByText("PKP")).toBeInTheDocument();
    });

    test('Render button and move to /history page', () => {
        const mockNavigate = jest.fn();
        useNavigate.mockImplementation(() => mockNavigate);

        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user: { name: 'Test User' },
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
        });
    
        const { rerender } = render(
            <BrowserRouter>
                <ConfirmationPage />
            </BrowserRouter>
        );
    
        const historyButton = screen.getByRole('button', { name: /view your tickets/i });
        fireEvent.click(historyButton);
    
        expect(historyButton).toBeInTheDocument();  // Sprawdzenie czy przycisk jest w dokumencie
        expect(mockNavigate).toHaveBeenCalledWith('/history');  // Sprawdzenie czy navigate zostało wywołane z właściwą ścieżką

        useAuth0.mockReturnValue({
            isAuthenticated: false,
            user: null,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
        });

        rerender(
            <BrowserRouter>
                <ConfirmationPage />
            </BrowserRouter>
        );

        let homeButton = screen.getByRole('button', { name: /home/i });
        expect(homeButton).toBeInTheDocument();
        fireEvent.click(homeButton);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
    
});
