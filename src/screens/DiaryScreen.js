import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Alert, ScrollView, Dimensions } from "react-native";
import { darkTheme } from "../theme";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
  margin: 0px 20px;
  width: ${width * 0.9}px;
`;

const SubTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  margin: 20px 20px 10px;
`;

const DiaryText = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  margin: 0px 20px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.button};
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export default function DiaryScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const diaryData = await AsyncStorage.getItem(selectedDate);
      if (diaryData) {
        const parsedData = JSON.parse(diaryData);
        setTitle(parsedData.title || "");
        setDiary(parsedData.diary || "");
      }
    };

    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    if (route.params && route.params.selectedDate) {
      setSelectedDate(route.params.selectedDate);
    }
  }, [route.params]);

  const handleEdit = async () => {
    const diaryData = await AsyncStorage.getItem(selectedDate);

    if (diaryData) {
      const parsedData = JSON.parse(diaryData);
      navigation.navigate("Input", {
        selectedDate,
        existingData: parsedData,
      });
    } else {
      navigation.navigate("Input", {
        selectedDate,
        existingData: null,
      });
    }
  };
  const handleDelete = () => {
    Alert.alert("삭제 확인", "이 일기를 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        onPress: async () => {
          await AsyncStorage.removeItem(selectedDate);
          navigation.navigate("Home", { refresh: true });
        },
      },
    ]);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={darkTheme.background}
        />
        <ScrollView>
          <Title>{selectedDate}</Title>
          <SubTitle>제목</SubTitle>
          <DiaryText>{title}</DiaryText>
          <SubTitle>내용</SubTitle>
          <DiaryText>{diary}</DiaryText>
        </ScrollView>
        <ButtonContainer>
          <Button onPress={handleEdit}>
            <ButtonText>수정</ButtonText>
          </Button>
          <Button onPress={handleDelete}>
            <ButtonText>삭제</ButtonText>
          </Button>
        </ButtonContainer>
      </Container>
    </ThemeProvider>
  );
}
