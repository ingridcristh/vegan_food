import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text, View, ScrollView} from "react-native";
import { Header } from "../components/header";
import { Banner } from "../components/banner";
import { Search } from "../components/search";
import { Section } from "../components/section";
import { TrendingFoods } from "../components/trending";
import { Restaurants } from "../components/restaurants";
import {RestaurantsVerticalList} from "../components/list";

import Constants from 'expo-constants'



const statusBarHeight = Constants.statusBarHeight;

export default function Index() {

  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const logado = await AsyncStorage.getItem("logado");
      if (logado !== "true") {
        router.replace("/cadastro"); // Agora redireciona para a tela de login
      } else {
        setLoaded(true);
      }
    }
    checkLogin();
  }, []);

  if (!loaded) return null; // Evita piscar a tela ao carregar

  
  return (
    <ScrollView 
      style={{flex : 1}} 
      className="bg-slate-200"
      showsVerticalScrollIndicator={false}
      >
        <View className="w-full px-4" style={{marginTop: statusBarHeight + 8}}>
          <Header/>

          <Banner/>

          <Search/>
        </View>

        <Section
          name="Comidas em alta"
          label="Veja mais"
          action={() => console.log("CLICOU NO VEJA MAIS")}
          size="text-2xl"
        />

        <TrendingFoods/>

        <Section
          name="Famosos no Vegan Food"
          label="Veja todos"
          action={() => console.log("CLICOU NO FAMOSOS")}
          size="text-xl"
        />

        <Restaurants/>

        <Section
          name="Restaurantes"
          label="Veja todos"
          action={() => console.log("CLICOU NO RESTAURANTES")}
          size="text-xl"
        />

        <RestaurantsVerticalList/>

    
      
    </ScrollView>
  );
}
