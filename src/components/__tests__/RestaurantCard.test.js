import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RestaurantCard, { withVegLabel } from '../RestaurantCard';
import MOCK_DATA from '../mocks/restCardMock.json';
import MOCK_DATA_VEG from '../mocks/restCardVegMock.json';

test('Should render restaurant card component with props data', () => {
  render(<RestaurantCard resData={MOCK_DATA} />);
  const restName = screen.getByText(MOCK_DATA.info.name);
  expect(restName).toBeInTheDocument();
});

test('Should render restaurant card component with promoted label', () => {
  const RestaurantCardVeg = withVegLabel(RestaurantCard);
  render(
    MOCK_DATA_VEG.info?.veg === true ? (
      <RestaurantCardVeg resData={MOCK_DATA_VEG} />
    ) : (
      <RestaurantCard resData={MOCK_DATA_VEG} />
    )
  );
  const restName = screen.getByText('Veg');
  expect(restName).toBeInTheDocument();
});
