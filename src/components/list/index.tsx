import { View,Text } from 'react-native';
import { useState,useEffect } from 'react';
import { RestaurantItem } from "./item";

export interface RestaurantsProps{
    id: string;
    name: string;
    image: string;
}


export  function RestaurantsVerticalList() {
     const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([])
        useEffect(() => {
            async function getFoods(){
              const response = await fetch("http://192.168.1.6:3000/restaurants")
              const data = await response.json()
              setRestaurants(data);
            }
        
            getFoods();
          }, [])


 return (
   <View>
    {restaurants.map(item =>(
        <RestaurantItem item={item} key={item.id}/>
    ))}
   </View>
  );
}