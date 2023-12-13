import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Dimensions, Alert, BackHandler } from "react-native";
import { darkTheme, lightTheme } from "../theme";
import { StatusBar } from "react-native";
import Input from "../components/Input";
import TitleInput from "../components/TitleInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {colorOptions1, colorOptions2, colorOptions3, colorOptions4} from './OptionScreen'



const { height, width } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  width: ${width * 0.9}px;
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const Button = styled.TouchableOpacity`
  margin: 0 10px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.button};
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const ColorButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: flex-start;
  width: ${width * 0.9}px;
`;

const ColorButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 0 5px;
`;

const CheckIcon = styled.Text`
  color: white;
  top: 20%;
  left: 30%;
  font-size: 20px;
  font-weight: bold;
  
`;


export default function InputScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedColor, setSelectedColor] = useState("none");
  const [selectedColorOption, setSelectedColorOption] = useState(1);
  

  useEffect(() => {
    const fetchData = async () => {
      const storedSelectedDate = await AsyncStorage.getItem("selectedDate");
      const colorOptionsData = await AsyncStorage.getItem('colorOptions');
      if (storedSelectedDate) {
        setSelectedDate(storedSelectedDate);
      }
      if (colorOptionsData) {
        const parsedData = JSON.parse(colorOptionsData);
        setSelectedColorOption(parsedData.colorOptionSelect);
        console.log("InputScreen selectedColorOption: ",parsedData.colorOptionSelect);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (route.params && route.params.existingData) {
      const { title: existingTitle, diary: existingDiary, color: existingColor } =
        route.params.existingData;
      setTitle(existingTitle || "");
      setDiary(existingDiary || "");
      setSelectedColor(existingColor || "none");
    }
  }, [route.params]);

  useEffect(() => {
    if (selectedColor === "none") {
      const defaultColor = colorOptions1[0].id;
      setSelectedColor(defaultColor);
    }
  }, [selectedColor]);
  

  useEffect(() => {
    const backAction = () => {
      Alert.alert("일기 작성 취소", "일기 작성을 취소 하시겠습니까?", [
        {
          text: "아니요",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "네",
          onPress: () => navigation.goBack(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleCancel = () => {
    Alert.alert("일기 작성을 취소 하시겠습니까?", "", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const handleConfirm = async () => {
    try {
      const id = selectedDate;
      const data = {
        title: title,
        diary: diary,
        color: selectedColor,
      };
      console.log(data);
      await AsyncStorage.setItem(id, JSON.stringify(data));
      Alert.alert(
        "작성 완료",
        "일기가 작성되었습니다.",
        [
          {
            text: "확인",
            onPress: () => navigation.navigate("Home", { refresh: true }),
          },
        ]
      );
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("작성 실패", "일기를 저장하는 도중 오류가 발생했습니다.", [
        { text: "확인" },
      ]);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={darkTheme.background}
        />
        <Title>{selectedDate} Diary</Title>
        <ColorButtonContainer>
          {selectedColorOption === 1 && colorOptions1.map((colorOption) => (
            <ColorButton
              key={colorOption.id}
              onPress={() => setSelectedColor(colorOption.id)}
              style={{
                backgroundColor: colorOption.code,
              }}
            >
              {selectedColor === colorOption.id && <CheckIcon>✔</CheckIcon>}
            </ColorButton>
          ))}
          {selectedColorOption === 2 && colorOptions2.map((colorOption) => (
            <ColorButton
              key={colorOption.id}
              onPress={() => setSelectedColor(colorOption.id)}
              style={{
                backgroundColor: colorOption.code,
              }}
            >
              {selectedColor === colorOption.id && <CheckIcon>✔</CheckIcon>}
            </ColorButton>
          ))}
          {selectedColorOption === 3 && colorOptions3.map((colorOption) => (
            <ColorButton
              key={colorOption.id}
              onPress={() => setSelectedColor(colorOption.id)}
              style={{
                backgroundColor: colorOption.code,
              }}
            >
              {selectedColor === colorOption.id && <CheckIcon>✔</CheckIcon>}
            </ColorButton>
          ))}
          {selectedColorOption === 4 && colorOptions4.map((colorOption) => (
            <ColorButton
              key={colorOption.id}
              onPress={() => setSelectedColor(colorOption.id)}
              style={{
                backgroundColor: colorOption.code,
              }}
            >
              {selectedColor === colorOption.id && <CheckIcon>✔</CheckIcon>}
            </ColorButton>
          ))}
        </ColorButtonContainer>
        <TitleInput
          placeholder="제목을 입력하시오…"
          theme={darkTheme}
          value={title}
          onInputChange={(text) => setTitle(text)}
        />
        <Input
          placeholder="내용을 입력하시오… "
          theme={darkTheme}
          value={diary}
          onInputChange={(text) => setDiary(text)}
        />
        <ButtonContainer>
          <Button onPress={handleCancel}>
            <ButtonText>취소</ButtonText>
          </Button>
          <Button onPress={handleConfirm}>
            <ButtonText>확인</ButtonText>
          </Button>
        </ButtonContainer>
      </Container>
    </ThemeProvider>
  );
}
