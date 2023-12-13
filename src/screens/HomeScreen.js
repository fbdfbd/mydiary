import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "../theme";
import { StatusBar, TouchableOpacity, Dimensions, Image, Text } from "react-native";
import CustomCalendar from "../components/CustomCalendar";
import NavigationBar from "../components/NavigationBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditImage from '../../assets/icons/edit.png'
import {colorOptions1, colorOptions2, colorOptions3, colorOptions4} from '../screens/OptionScreen'

const { width, height } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

const NavigationBarContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${height * 0.06}px;
`;

const DiaryButtonContainer = styled.View`
  margin-top: 20px;
`;

const DiaryButton = styled.TouchableOpacity`
  background-color: ${({ diaryColor }) =>
    diaryColor && diaryColor !== "none" ? diaryColor : darkTheme.main};
  width: ${width * 0.9}px;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 10px;
`;

const DiaryButtonText = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: bold;
`;

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState("");
  const [diaryExists, setDiaryExists] = useState(false);
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryColor, setDiaryColor] = useState("");
  const [refreshCalendar, setRefreshCalendar] = useState(false);

  const goToInputScreen = async () => {
    await AsyncStorage.setItem("selectedDate", selectedDate);
    navigation.navigate("Input");
  };

  useFocusEffect(
    React.useCallback(() => {
      setRefreshCalendar((prevState) => !prevState);
      const refreshData = async () => {
        if (route.params && route.params.refresh) {
          checkDiaryInfo();
        }
      };
      checkDiaryInfo();
      refreshData();
    }, [route.params])
  );

  const getColorOptionArray = (colorOptionSelect) => {
    switch (colorOptionSelect) {
      case 1:
        return colorOptions1;
      case 2:
        return colorOptions2;
      case 3:
        return colorOptions3;
      case 4:
        return colorOptions4;
      default:
        return [];
    }
  };
  
  const setDiaryColorByOption = (colorOptionSelect, color, setDiaryColor) => {
    const colorOptionArray = getColorOptionArray(colorOptionSelect);
    if (colorOptionArray.length > 0) {
      setDiaryColor(colorOptionArray[color - 1]?.code || "");
    }
  };
  
  const checkDiaryInfo = async () => {
    const diaryData = await AsyncStorage.getItem(selectedDate);
    const colorOption = await AsyncStorage.getItem("colorOptions");
  
    if (diaryData) {
      setDiaryExists(true);
      const colorOptionData = JSON.parse(colorOption);
      const parsedData = JSON.parse(diaryData);
      setDiaryTitle(parsedData.title);
      setDiaryColorByOption(colorOptionData.colorOptionSelect, parsedData.color, setDiaryColor);
    } else {
      setDiaryExists(false);
      setDiaryTitle("");
    }
  };
  
  const handleDateSelection = async (selectedDate) => {
    setSelectedDate(selectedDate);
    checkDiaryInfo();
  
    const diaryData = await AsyncStorage.getItem(selectedDate);
    const colorOption = await AsyncStorage.getItem("colorOptions");
  
    if (diaryData) {
      setDiaryExists(true);
      const colorOptionData = JSON.parse(colorOption);
      const parsedData = JSON.parse(diaryData);
      setDiaryTitle(parsedData.title);
      setDiaryColorByOption(colorOptionData.colorOptionSelect, parsedData.color, setDiaryColor);
    } else {
      setDiaryExists(false);
      setDiaryTitle("");
    }
  };
  const handleDiaryPress = () => {
    if (diaryExists) {
      navigation.navigate("Diary", { selectedDate });
    } else {
      goToInputScreen();
    }
  };

  useEffect(() => {
    const refreshData = async () => {
      if (route.params && route.params.refresh) {
        checkDiaryInfo();
      }
      
    };
    checkDiaryInfo();
    refreshData();
  }, [route.params]);

  useEffect(() => {
    if (!selectedDate) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setSelectedDate(formattedDate);
      checkDiaryInfo();
    }
  }, [selectedDate]);


  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={darkTheme.background}
        />
        <Title>My Diary</Title>
        <CustomCalendar
          onDateSelect={handleDateSelection}
          refreshCalendar={refreshCalendar}
        />
        <Title>{selectedDate}</Title>
        {diaryExists ? (
          <DiaryButtonContainer>
            <DiaryButton onPress={handleDiaryPress} diaryColor={diaryColor}>
              <DiaryButtonText>{diaryTitle}</DiaryButtonText>
            </DiaryButton>
          </DiaryButtonContainer>
        ) : (
          <TouchableOpacity
            onPress={handleDiaryPress}
            style={{
              alignItems: "center",
              padding: 30,
            }}
          ><Text
           style={{
            fontSize: 20, 
            color: "white",
            marginBottom: 20
            }}>
            일기를 작성해보세요
            </Text>
            <Image source={EditImage} style={{ width: 40, height: 40, tintColor: 'white' }} />
          </TouchableOpacity>
        )}
        <NavigationBarContainer>
          <NavigationBar />
        </NavigationBarContainer>
      </Container>
    </ThemeProvider>
  );
}
