import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShowIfAdmin from '../../utils/ShowIfAdmin';
import AddButton from '../admin/AddButton';
import ProviderButton from '../admin/ProviderButton';
import StationButton from '../admin/StationButton';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
      isAuthenticated: true,
      user: { role: 'Admin' }
    })
  }));

describe('Rendering admin buttons', () => {
  test('renders children when user is admin', () => {
    const { getByText } = render(
        <ShowIfAdmin>
            <AddButton />
            <ProviderButton />
            <StationButton />
        </ShowIfAdmin>
    );

    expect(getByText('Add connection')).toBeInTheDocument();
    expect(getByText('Add provider')).toBeInTheDocument();
    expect(getByText('Add station')).toBeInTheDocument();
  });

  test('Navigating to admin panels', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate);

    const { getByText } = render(
      <ShowIfAdmin>
          <AddButton />
          <ProviderButton />
          <StationButton />
      </ShowIfAdmin>
    );

    fireEvent.click(getByText('Add connection'));
    expect(mockNavigate).toHaveBeenCalledWith('/add-connection');

    fireEvent.click(getByText('Add provider'));
    expect(mockNavigate).toHaveBeenCalledWith('/add-provider');

    fireEvent.click(getByText('Add station'));
    expect(mockNavigate).toHaveBeenCalledWith('/add-station');
  });
  
});
