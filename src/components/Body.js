import RestaurantCard, { withVegLabel } from './RestaurantCard';
import { useState, useEffect, useContext } from 'react';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';

const Body = () => {
  // State Variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState('');

  const RestaurantCardVeg = withVegLabel(RestaurantCard);
  useEffect(() => {
    fetchData();
  }, []);

  const { loggedInUser, setUserName } = useContext(UserContext);

  const fetchData = async () => {
    // const url =
    //   'https://api.allorigins.win/get?url=' +
    //   encodeURIComponent(
    //     'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    //   );
    const url =
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
    const response = await fetch(url);
    // const alloriginsData = await response.json();
    const json = await response.json();

    // The response from allorigins is wrapped in a 'contents' property
    // const json = JSON.parse(alloriginsData.contents);

    const rests =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    if (rests) {
      setListOfRestaurants(rests);
      setFilteredRestaurants(rests);
    }
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return (
      <div>
        <h1>Oh no, Please check your internet connection!</h1>
      </div>
    );
  }

  return filteredRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex p-4 m-4">
        <div className="search">
          <input
            type="text"
            data-testid="body-search-input"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search px-2 py-1 mx-3 bg-green-100 rounded-lg"
            onClick={() => {
              const searchedRests = listOfRestaurants.filter((rest) =>
                rest.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(searchedRests);
            }}
          >
            search
          </button>
          <button
            className="top-rest px-2 py-1 mx-3 bg-red-100 rounded-lg"
            onClick={() => {
              const filteredRestaurants = listOfRestaurants.filter(
                (rest) => rest.info.avgRating > 4
              );
              setFilteredRestaurants(filteredRestaurants);
            }}
          >
            Top Rated Restaurants
          </button>
          <div>
            <label>User Name </label>
            <input
              className="border border-black p-2"
              value={loggedInUser}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="rest-container flex flex-wrap">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={'/restaurant/' + restaurant.info.id}
          >
            {restaurant.info?.veg === true ? (
              <RestaurantCardVeg resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
