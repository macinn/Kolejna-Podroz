import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import SearchForm from './SearchForm';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';

test('renders search form with all inputs', () => {
  const { getByLabelText, getByText } = render(    
  <Router>
    <SearchForm url="https://localhost:60016/" />
  </Router>);
  
  expect(getByLabelText('Start station')).toBeInTheDocument();
  expect(getByLabelText('End station')).toBeInTheDocument();
  expect(getByLabelText('Departure Time')).toBeInTheDocument();
  expect(getByText('Search')).toBeInTheDocument();
});