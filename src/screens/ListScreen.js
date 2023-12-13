import React, { useState, useEffect, View } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Dimensions, ScrollView } from "react-native";
import { darkTheme } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  colorOptions1,
  colorOptions2,
  colorOptions3,
  colorOptions4,
} from "../screens/OptionScreen";
import DiaryButton from "../components/DiaryButton";
import NavigationBar from "../components/NavigationBar";

const { height, width } = Dimensions.get("window");

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
  margin: 0px 20px
`;

const SubTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  align-self: flex-start;
`;

const NavigationBarContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${height * 0.06}px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
`;

const Button = styled.TouchableOpacity`
  margin: 0 10px;
  padding: 5px 5px;
  border-radius: 5px;
`;


const ScrollViewContainer = styled.ScrollView`
  margin-bottom: 50px;
  width: ${width * 0.9}px;
`;

const ListScreen = ({ route, navigation }) => {
  const [diaryList, setDiaryList] = useState([]);
  const [colorOption, setColorOption] = useState(1);
  const [sortBy, setSortBy] = useState('oldToNew');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const diariesPromises = keys.map(async (key) => {
          const value = await AsyncStorage.getItem(key);
          return { key, value };
        });

        const diaries = await Promise.all(diariesPromises);

        const sortedDiaries = diaries.slice().sort((a, b) => {
          if (sortBy === 'oldToNew') {
            return a.key.localeCompare(b.key);
          } else {
            return b.key.localeCompare(a.key);
          }
        });

        setDiaryList(sortedDiaries);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      }
    };

    fetchData();
  }, [sortBy]);


  useFocusEffect(
    React.useCallback(() => {
      const fetchColorOptions = async () => {
        try {
          const colorOptionsData = await AsyncStorage.getItem("colorOptions");
          const parsedColorOptions = JSON.parse(colorOptionsData);
          const selectedColorOption = parsedColorOptions.colorOptionSelect;

          switch (selectedColorOption) {
            case 1:
              setColorOption(1);
              break;
            case 2:
              setColorOption(2);
              break;
            case 3:
              setColorOption(3);
              break;
            case 4:
              setColorOption(4);
              break;
            default:
              setColorOption(1);
          }
        } catch (error) {
          console.error("Error fetching color options:", error);
        }
      };

      fetchColorOptions();
    }, [])
  );
  
  const handleDiaryPress = (key) => {
    AsyncStorage.setItem("selectedDate", key);
    navigation.navigate("Diary", { selectedDate: key });
  };

  const getDateFromKey = (key) => {
    return key;
  };

  const handleSortBy = (sortingType) => {
    const sortedDiaries = diaryList.slice().sort((a, b) => {
      if (sortingType === 'oldToNew') {
        return a.key.localeCompare(b.key);
      } else {
        return b.key.localeCompare(a.key);
      }
    });

    setDiaryList(sortedDiaries);
  };

  const toggleSortBy = () => {
    const newSortBy = sortBy === 'oldToNew' ? 'newToOld' : 'oldToNew';
    setSortBy(newSortBy);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={darkTheme.background}
        />
        <Title>Diary List</Title>
        <ButtonContainer style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
          <Button onPress={toggleSortBy}>
            <SubTitle>{sortBy === 'oldToNew' ? '오래된 순 ↑' : '최신순 ↓'}</SubTitle>
          </Button>
        </ButtonContainer>
        <ScrollViewContainer
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ButtonContainer>
            {diaryList.map(
              ({ key, value }) =>
                key !== "selectedDate" &&
                key !== "colorOptions" && (
                  <React.Fragment key={key}>
                    <SubTitle>{getDateFromKey(key)}</SubTitle>
                    <DiaryButton
                      key={key}
                      onPress={() => handleDiaryPress(key)}
                      value={value}
                      selectedColorOption={colorOption}
                      colorOptions={
                        colorOption === 1
                          ? colorOptions1
                          : colorOption === 2
                          ? colorOptions2
                          : colorOption === 3
                          ? colorOptions3
                          : colorOptions4
                      }
                    />
                  </React.Fragment>
                )
            )}
          </ButtonContainer>
        </ScrollViewContainer>
      </Container>
      <NavigationBarContainer>
        <NavigationBar />
      </NavigationBarContainer>
    </ThemeProvider>
  );
};

export default ListScreen;