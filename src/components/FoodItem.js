import { CLOUDINARY_URL } from '../utils/constants';
import { addItem } from '../utils/cartSlice';
import { useDispatch } from 'react-redux';
const FoodItem = (props) => {
  const { foodInfo } = props;

  const dispatch = useDispatch();

  const handleAddItem = (itemInfo) => {
    // dispatch action
    dispatch(addItem(itemInfo));
  };

  return (
    <div
      data-testid="food-item"
      className="border-b-2 border-gray-200 p-2 flex justify-between"
    >
      <div className="w-9/12">
        <div className="font-semibold py-2 m-2 text-bottom text-left">
          <span>{foodInfo.name}</span>
          <span>
            {' '}
            Rs.
            {foodInfo.defaultPrice
              ? foodInfo.defaultPrice / 100
              : foodInfo.price / 100}
          </span>
        </div>
        <div>
          <p className="text-xs">{foodInfo.description}</p>
        </div>
      </div>
      <div className="w-2/12 relative">
        <button
          className="py-2 px-4 bg-black text-white absolute top-0 left-0"
          onClick={() => handleAddItem(foodInfo)}
        >
          Add+
        </button>
        <img src={CLOUDINARY_URL + foodInfo.imageId} />
      </div>
    </div>
  );
};

export default FoodItem;
