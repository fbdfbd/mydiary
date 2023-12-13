import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { StatusBar, Dimensions, Alert } from "react-native";
import { darkTheme } from "../theme";
import NavigationBar from "../components/NavigationBar";
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
  margin: 10px 20px;
`;
const SubTitle = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  align-self: flex-start;
  margin: 20px 20px;
`;

const NavigationBarContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${height * 0.06}px;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  margin: 20px;
`;

const Button = styled.TouchableOpacity`
  margin: 0 10px;
  padding: 5px 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.button};
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const ColorButton = styled.TouchableOpacity`
  width: ${width * 0.9}px;
  margin: 0 10px;
  padding: 5px 20px;
  border-radius: 5px;
  flex-direction: row;
`;

const ColorOptionView = styled.View`
  width: ${width * 0.1}px;
  height: ${width * 0.1}px;
  border-radius: 5px;
  margin: 0 5px;
`;

export const colorOptions1 = [
  { id: 1, code: "#87C699" },
  { id: 2, code: "#7EB0E2" },
  { id: 3, code: "#C6C179" },
  { id: 4, code: "#C6928C" },
  { id: 5, code: "#A988C6" },
];

export const colorOptions2 = [
  { id: 1, code: "#9A6570" },
  { id: 2, code: "#64CCC0" },
  { id: 3, code: "#CCCC64" },
  { id: 4, code: "#CC8464" },
  { id: 5, code: "#9764CC" },
];

export const colorOptions3 = [
  { id: 1, code: "#AA93CC" },
  { id: 2, code: "#93A0CC" },
  { id: 3, code: "#CCC393" },
  { id: 4, code: "#4C4832" },
  { id: 5, code: "#3A2C4D" },
];

export const colorOptions4 = [
  { id: 1, code: "#93CCCB" },
  { id: 2, code: "#93CCA4" },
  { id: 3, code: "#CC9D93" },
  { id: 4, code: "#4D322C" },
  { id: 5, code: "#2C4D4C" },
];


const OptionScreen = () => {
  const handleColorOptionClick = async (colorOptionSelect) => {
    try {
      const currentData = await AsyncStorage.getItem('colorOptions');
      let newData;
      if (currentData) {
        const parsedData = JSON.parse(currentData);
        parsedData.colorOptionSelect = colorOptionSelect;
        newData = JSON.stringify(parsedData);
      } else {
        newData = JSON.stringify({ colorOptionSelect });
      }
      await AsyncStorage.setItem('colorOptions', newData);
      
      Alert.alert("변경 완료", `색상이 ${colorOptionSelect}번으로 변경되었습니다.`);
      console.log(colorOptionSelect);
    } catch (error) {
      console.error('색상 옵션 업데이트 중 오류 발생:', error);
      Alert.alert('오류', '색상 옵션을 업데이트하는 도중 오류가 발생했습니다.');
    }
  };

  
const handleDeleteAllDiaries = async () => {
  Alert.alert(
    "삭제 확인",
    "정말로 모든 데이터를 삭제하시겠습니까?",
    [
      {
        text: "취소",
        onPress: () => console.log("삭제 취소"),
        style: "cancel"
      },
      { text: "확인", onPress: async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          const keysToKeep = keys.filter((key) => key !== 'colorOptions' && key !== 'selectedDate');
          await AsyncStorage.multiRemove(keysToKeep);

          Alert.alert("삭제 완료", "모든 데이터가 삭제되었습니다.");
          
        } catch (error) {
          console.error("Error deleting all diaries:", error);
          Alert.alert("오류", "데이터 삭제 중 오류가 발생했습니다.");
        }
      }}
    ],
    { cancelable: false }
  );
};


  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={darkTheme.background}
        />
        <Title>Option</Title>
        <SubTitle>모든 데이터 삭제</SubTitle>
        <ButtonContainer>
          <Button onPress={handleDeleteAllDiaries}>
            <ButtonText>삭제하기</ButtonText>
          </Button>
        </ButtonContainer>
        <SubTitle>일기 색상</SubTitle>
        <ColorButton onPress={() => handleColorOptionClick(1)}>
        <ButtonText>색상1     </ButtonText>
          {colorOptions1.map((colorOption, index) => (
            <ColorOptionView
              key={index}
              style={{
                backgroundColor: colorOption.code,
              }}
            />
          ))}
        </ColorButton>

        <ColorButton onPress={() => handleColorOptionClick(2)}>
        <ButtonText>색상2     </ButtonText>
        {colorOptions2.map((colorOption, index) => (
            <ColorOptionView
              key={index}
              style={{
                backgroundColor: colorOption.code,
              }}
            />
          ))}
        </ColorButton>
        <ColorButton onPress={() => handleColorOptionClick(3)}>
        <ButtonText>색상3     </ButtonText>
        {colorOptions3.map((colorOption, index) => (
            <ColorOptionView
              key={index}
              style={{
                backgroundColor: colorOption.code,
              }}
            />
          ))}
        </ColorButton>
        <ColorButton onPress={() => handleColorOptionClick(4)}>
        <ButtonText>색상4     </ButtonText>
        {colorOptions4.map((colorOption, index) => (
            <ColorOptionView
              key={index}
              style={{
                backgroundColor: colorOption.code,
              }}
            />
          ))}
        </ColorButton>
        <NavigationBarContainer>
          <NavigationBar />
        </NavigationBarContainer>
      </Container>
    </ThemeProvider>
  );
};

export default OptionScreen;
