import React, { useState, useEffect } from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/HomeScreen";
import InputScreen from "./screens/InputScreen";
import DiaryScreen from "./screens/DiaryScreen";
import ListScreen from "./screens/ListScreen";
import OptionScreen from "./screens/OptionScreen";

const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const existingData = await AsyncStorage.getItem('colorOptions');

        if (!existingData) {
          await AsyncStorage.setItem('colorOptions', JSON.stringify({ colorOptionSelect: 1 }));
        }
      } catch (error) {
        console.error('초기 설정 중 오류 발생:', error);
      }
    };
    initializeApp();
  }, []); 

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Input" component={InputScreen} />
        <Stack.Screen name="Diary" component={DiaryScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Option" component={OptionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
