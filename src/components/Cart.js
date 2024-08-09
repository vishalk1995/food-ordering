import { useSelector } from 'react-redux';
import FoodItem from './FoodItem';
import { clearCart } from '../utils/cartSlice';
import { useDispatch } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <button
        className="p-2 m-2 bg-black text-white"
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        Clear Cart
      </button>
      <div className="w-6/12 m-auto">
        {cartItems.length === 0 && <p>No items in the cart</p>}
        {cartItems.map((item) => {
          return (
            <div key={item.id}>
              <FoodItem foodInfo={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
