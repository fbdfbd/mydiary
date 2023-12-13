import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { darkTheme, lightTheme } from "../theme";

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.itemBackground};
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

const TitleInput = ({ placeholder, theme, onInputChange, value }) => {
  const width = Dimensions.get("window").width;

  return (
    <StyledInput
      width={width}
      placeholder={placeholder}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      keyboardAppearance={theme === darkTheme ? "dark" : "light"}
      value={value}
      onChangeText={onInputChange}
    />
  );
};

export default TitleInput;
