import ShimmerRestMenu from './ShimmerRestMenu';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import { useParams } from 'react-router-dom';
import MenuCategory from './MenuCategory';
import { useState } from 'react';

const RestaurantMenu = () => {
  const { restId } = useParams();

  const restInfo = useRestaurantMenu(restId);
  const [showIndex, setShowIndex] = useState(-1);

  const toggleShowIndex = (newIndex) => {
    if (showIndex === newIndex) {
      setShowIndex(-1);
    } else {
      setShowIndex(newIndex);
    }
  };

  const { name, cuisines, costForTwoMessage } =
    restInfo?.cards[2]?.card?.card?.info || {};

  const categories =
    restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(
      (category) =>
        category?.card?.card?.['@type'] ==
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    );

  return restInfo === null ? (
    <ShimmerRestMenu />
  ) : (
    <div className="rest-menu text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <h3 className="font-semibold text-lg mb-3">
        {cuisines.join(', ')} : {costForTwoMessage}
      </h3>
      {categories.map((category, index) => {
        return (
          // controlled component
          <MenuCategory
            key={category.card.card.title}
            categoryInfo={category.card.card}
            showItems={index === showIndex ? true : false}
            showThisIndex={() => toggleShowIndex(index)}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
