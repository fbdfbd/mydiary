import React from 'react';
import styled, { css } from 'styled-components';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DiaryButtonContainer = styled.TouchableOpacity`
  ${({ selectedColorOption, colorOptions, value }) => {
    const parsedValue = JSON.parse(value);
    const selectedColorCode =
      colorOptions.find((option) => option.id === parsedValue.color)?.code ||
      'defaultColorCode';

    return css`
      background-color: ${selectedColorCode};
    `;
  }}
  width: ${width * 0.9}px;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const DiaryButtonText = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: bold;
`;

const DiaryButton = ({ value, selectedColorOption, colorOptions, onPress }) => (
  <DiaryButtonContainer
    onPress={onPress}
    selectedColorOption={selectedColorOption}
    colorOptions={colorOptions}
    value={value}
  >
    <DiaryButtonText>
      {value ? JSON.parse(value).title : '제목없음'}
    </DiaryButtonText>
  </DiaryButtonContainer>
);

export default DiaryButton;
