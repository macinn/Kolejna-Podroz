import React from 'react';
import { render, screen } from '@testing-library/react';
import TripDetailsPage from './tripDetails';
import { BrowserRouter as Router } from 'react-router-dom';
import { useStore } from '../../stores/SearchFormStore';
import '@testing-library/jest-dom';

jest.mock('../../stores/SearchFormStore', () => ({
    useStore: jest.fn()
}));

describe('TripDetailsPage', () => {
    beforeEach(() => {
        const specificDate1 = new Date(2024, 4, 11, 10, 30, 0);
        const specificDate2 = new Date(2024, 4, 11, 14, 30, 0);
        useStore.mockReturnValue({
            selectedConnection: {
                id: '123',
                from: { name: 'StartStationName' },
                destination: { name: 'EndStationName' },
                departureTime: specificDate1.toISOString(),
                arrivalTime: specificDate2.toISOString(),
                provider: { name: 'ProviderName' },
                price: 100
            },
            setSelectedConnection: jest.fn()
        });
    });

    test('renders connection details', () => {
        render(
            <Router>
                <TripDetailsPage url="http://example.com" />
            </Router>
        );
        expect(screen.getByText('From starting station')).toBeInTheDocument();
        expect(screen.getByText('StartStationName')).toBeInTheDocument();
        expect(screen.getByText('To end station')).toBeInTheDocument();
        expect(screen.getByText('EndStationName')).toBeInTheDocument();
        expect(screen.getByText('Provider:')).toBeInTheDocument();
        expect(screen.getByText('ProviderName')).toBeInTheDocument();
    });

    test('renders departure date and time', () => {
        render(
            <Router>
                <TripDetailsPage url="http://example.com" />
            </Router>
        );
        expect(screen.getByText(/^Departure date:/i)).toBeInTheDocument();
        expect(screen.getByText(/^Time of departure:/i)).toBeInTheDocument();
        expect(screen.getByText(/^Time of arrival:/i)).toBeInTheDocument();
    });

    test('renders seating preferences', () => {
        render(
            <Router>
                <TripDetailsPage url="http://example.com" />
            </Router>
        );
        expect(screen.getByText(/^Choose your seating preference:/i)).toBeInTheDocument();
        expect(screen.getByText(/^Ticket type:/i)).toBeInTheDocument();
    });

    test('renders reservation button', () => {
        render(
            <Router>
                <TripDetailsPage url="http://example.com" />
            </Router>
        );
        expect(screen.getByRole('button', { name: /go to trip summary/i })).toBeInTheDocument();
    });

    test('check date and hours', () => {
        render(
            <Router>
                <TripDetailsPage url="http://example.com" />
            </Router>
        );

        //expect(screen.getByText('11.05.2024')).toBeInTheDocument();
        expect(screen.getByText('10:30')).toBeInTheDocument();
        expect(screen.getByText('14:30')).toBeInTheDocument();
    });
});
