import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const { height, width } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.Text`
  width: ${width * 0.9}px;
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

export const Button = styled.TouchableOpacity`
  margin: 0 10px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.main};
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export const SubTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  margin: 20px 20px 10px;
`;

export const DiaryText = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  margin: 0px 20px;
`;

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
  flex-direction: row;
`;

export const NavigationBarContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${height * 0.06}px;
`;

export const DiaryButtonContainer = styled.View`
  margin-top: 20px;
`;

export const DiaryButton = styled.TouchableOpacity`
  background-color: ${({ diaryColor }) =>
    diaryColor && diaryColor !== "none" ? diaryColor : darkTheme.main};
  width: ${width * 0.9}px;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 10px;
`;

export const DiaryButtonText = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: bold;
`;


export const ColorButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: flex-start;
  width: ${width * 0.9}px;
`;

export const ColorButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 0 5px;
`;

export const ScrollViewContainer = styled.ScrollView`
  width: ${width * 0.9}px;
`;