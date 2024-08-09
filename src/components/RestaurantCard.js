import { CLOUDINARY_URL } from '../utils/constants';
const RestaurantCard = (props) => {
  const { info } = props.resData;
  //data-testid is given for test cases purpose

  return (
    <div
      data-testid="restaurant-card-testid"
      className="rest-card m-4 p-4 w-[230px] bg-cyan-100 rounded-lg hover:bg-cyan-300"
    >
      <img
        className="rest-logo rounded-lg"
        alt="rest-logo"
        src={CLOUDINARY_URL + info.cloudinaryImageId}
      />
      <h3 className="rest-name font-bold py-1 text-mg">{info.name}</h3>
      <h4 id="rest-card-cui">{info.cuisines.join(', ')}</h4>
      <h4 id="rest-card-rate">{info.avgRating} stars</h4>
      <h4 id="rest-card-time">{info.sla.deliveryTime} minutes</h4>
      <h4 id="rest-card-time">{info.costForTwo}</h4>
    </div>
  );
};

// Higher order component to Enrich based on whether the restaurant is veg or not.

export const withVegLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-gray-300 text-black p-2 m-2">Veg</label>
        <RestaurantCard resData={props.resData} />{' '}
        {/* or we can simply write {...props} this spreader operator destructure props and send them all */}
      </div>
    );
  };
};

export default RestaurantCard;
