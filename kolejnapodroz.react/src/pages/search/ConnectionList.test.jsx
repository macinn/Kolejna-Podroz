import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConnectionsList from './ConnectionsList';
import { useStore } from '../../stores/SearchFormStore';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import '@testing-library/jest-dom';

jest.mock('../../stores/SearchFormStore', () => ({
    useStore: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock("@auth0/auth0-react", () => ({
    useAuth0: jest.fn(),
}));

describe('ConnectionsList', () => {
    beforeEach(() => {
        useStore.mockImplementation(() => ({
            connections: [
                {
                    id: '1',
                    from: { name: "Station A", city: "City A" },
                    departureTime: new Date('2024-05-20T12:00:00Z').toISOString(),
                    destination: { name: "Station B", city: "City B" },
                    arrivalTime: new Date('2024-05-20T14:00:00Z').toISOString(),
                }
            ],
            selectedConnection: null,
            setSelectedConnection: jest.fn(),
        }));

        useNavigate.mockImplementation(() => jest.fn());
        useAuth0.mockImplementation(() => ({ isAuthenticated: true }));
    });

    test('Render connection list with mocked data', () => {
        render(<ConnectionsList />);
        expect(screen.getByText(/Station A - City A/)).toBeInTheDocument();
        expect(screen.getByText(/Station B - City B/)).toBeInTheDocument();
        expect(screen.getByText(/Select/)).toBeInTheDocument();

        const departureTime = new Date('2024-05-20T12:00:00Z').toLocaleString();
        const arrivalTime = new Date('2024-05-20T14:00:00Z').toLocaleString();

        
        expect(screen.getByText(`Departure Time: ${departureTime}`)).toBeInTheDocument();
        expect(screen.getByText(`Arrival Time: ${arrivalTime}`)).toBeInTheDocument();
    });

    test('Click button to go to /details page', () => {
        const navigate = jest.fn();
        useNavigate.mockImplementation(() => navigate);
        render(<ConnectionsList />);
        fireEvent.click(screen.getByText(/Select/));
        expect(navigate).toHaveBeenCalledWith('/details');
    });
});
