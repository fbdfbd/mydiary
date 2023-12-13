import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const NavigationBar = () => {
  const navigation = useNavigation();

  const handleListPress = () => {
    navigation.navigate("List");
  };

  const handleHomePress = () => {
    navigation.navigate("Home");
  };

  const handleOptionPress = () => {
    navigation.navigate("Option");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        backgroundColor: "#5B9999",
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity onPress={handleListPress} style={{ padding: 10 }}>
        <Icon name="list" size={30} color="#efefef" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleHomePress} style={{ padding: 10 }}>
        <Icon name="home" size={30} color="#efefef" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleOptionPress} style={{ padding: 10 }} >
        <Icon name="cog" size={30} color="#efefef" />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationBar;
