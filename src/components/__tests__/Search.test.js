import Body from '../Body';
import { render, screen, fireEvent } from '@testing-library/react';
import MOCK_BODY_DATA from '../mocks/mockRestaurantListData.json';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react';
import '@testing-library/jest-dom';

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_BODY_DATA);
    },
  });
});

test('Should search rest list for pizza input', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );
  const searchButton = screen.getByRole('button', { name: 'search' });
  expect(searchButton).toBeInTheDocument();

  const cardsBeforeSearch = screen.getAllByTestId('restaurant-card-testid');
  const searchInput = screen.getByTestId('body-search-input');
  fireEvent.change(searchInput, { target: { value: 'pizza' } });
  fireEvent.click(searchButton);

  //original cards should be 8
  expect(cardsBeforeSearch.length).toBe(8);

  // screen should load 2 cards
  const restaurantCardsAfterSearch = screen.getAllByTestId(
    'restaurant-card-testid'
  );
  expect(restaurantCardsAfterSearch.length).toBe(2);
});

test('Should filter top rated restaurants. 7.', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const topRatedButton = screen.getByRole('button', {
    name: 'Top Rated Restaurants',
  });
  fireEvent.click(topRatedButton);
  const topRatedRestaurant = screen.getAllByTestId('restaurant-card-testid');
  expect(topRatedRestaurant.length).toBe(7);
});
