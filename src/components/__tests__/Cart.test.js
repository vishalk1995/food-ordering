import Cart from '../Cart';
import RestaurantMenu from '../RestaurantMenu';
import Header from '../Header';
import { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MOCK_MENU_DATA from '../mocks/mockMenuData.json';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../utils/cartSlice';

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(MOCK_MENU_DATA),
  });
});

// REDUX STORE STATE IS SHARED BETWEEN TEST IN THE SAME FILE, WHICH IS WHY WE NEED TO RE-INITIALIZE THE STORE BEFORE EACH TEST CASE.
// FOR THIS WE CAN CREATE NEW STORE INSTANCE FOR EACH TEST CASE OR USE JEST'S beforeEach HOOK

let store;
beforeEach(() => {
  store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
});

// This is not a good test case, we should make multiple test cases instead of 1 long test case
test('Should load restaurant menu component', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={store}>
          {/* We are also rendering Header component, which is using Link thus BrowserRouter */}
          <Header />
          <RestaurantMenu />
        </Provider>
      </BrowserRouter>
    )
  );
  const recommendedItemsPanel = screen.getByText('Recommended (6)');
  fireEvent.click(recommendedItemsPanel);

  // asserting whether the recommended items are displayed or not
  const recommendedItems = screen.getAllByTestId('food-item');
  expect(recommendedItems.length).toBe(6);

  const addButtons = screen.getAllByRole('button', { name: 'Add+' });
  expect(screen.getByText('Cart🛒 0 items')).toBeInTheDocument();

  // click on the first add button
  fireEvent.click(addButtons[0]);
  // At this point header should show 1 item in cart
  expect(screen.getByText('Cart🛒 1 items')).toBeInTheDocument();

  //Adding second item
  fireEvent.click(addButtons[1]);
  expect(screen.getByText('Cart🛒 2 items')).toBeInTheDocument();
});

test('Should have 2 items in the cart page', async () => {
  await act(async () =>
    render(
      <Provider store={store}>
        <RestaurantMenu />
        <Cart />
      </Provider>
    )
  );

  const recommendedItemsPanel = screen.getByText('Recommended (6)');
  fireEvent.click(recommendedItemsPanel);
  const recommendedItems = screen.getAllByTestId('food-item');
  expect(recommendedItems.length).toBe(6);

  const addButtons = screen.getAllByRole('button', { name: 'Add+' });
  fireEvent.click(addButtons[0]);
  fireEvent.click(addButtons[1]);

  const allItemsWithFoodItemTestId = screen.getAllByTestId('food-item');
  // NOW THIS WILL 8 as we already have 6 rendered in the Recommended section and 2 NEW ARE FROM CART AS WE ARE RENDERING CART COMPONENT AS WELL
  expect(allItemsWithFoodItemTestId.length).toBe(8);
  fireEvent.click(screen.getByRole('button', { name: 'Clear Cart' }));

  // we can also assert for "Cart🛒 0 items" but for that we need to render Header as well.

  expect(screen.getByText('No items in the cart')).toBeInTheDocument();
  //Now again it will be 6 as we cleared the cart
  expect(screen.getAllByTestId('food-item').length).toBe(6);
});
