import FoodItem from './FoodItem';

const MenuCategory = (props) => {
  const { categoryInfo, showItems, showThisIndex } = props;

  return (
    <div className="w-6/12 bg-gray-50 shadow-lg p-4 mx-auto my-2 rounded-lg ">
      <div
        className="flex justify-between cursor-pointer"
        onClick={showThisIndex}
      >
        <span className="font-bold text-lg">
          {categoryInfo.title} ({categoryInfo.itemCards.length})
        </span>
        <span>{'🔽'}</span>
      </div>
      <div>
        {showItems &&
          categoryInfo?.itemCards.map((item) => {
            return (
              <div key={item.card.info.id}>
                <FoodItem foodInfo={item.card.info} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MenuCategory;
