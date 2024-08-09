import { useEffect, useState } from 'react';
import { MENU_API_URL } from './constants';

const useRestaurantMenu = (restId) => {
  // fetch data

  const [restInfo, setRestInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // const url =
    //   'https://api.allorigins.win/get?url=' +
    //   encodeURIComponent(MENU_API_URL + restId);

    const url = MENU_API_URL + restId;
    const alloriginsData = await fetch(url);
    const swiggyData = await alloriginsData.json();
    // const swiggyDataJSON = await alloriginsData.json();
    // const swiggyData = JSON.parse(swiggyDataJSON.contents);
    setRestInfo(swiggyData.data);
  };

  return restInfo;
};

export default useRestaurantMenu;
