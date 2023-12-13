import React, { useState } from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { darkTheme } from "../theme";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  margin: 3px 0;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.itemBackground};
  font-size: 18px;
  height: 500px;
  color: ${({ theme }) => theme.text};
`;

const Input = ({ placeholder, theme, onInputChange, value }) => {
  const width = Dimensions.get("window").width;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ScrollView>
          <StyledInput
            width={width}
            placeholder={placeholder}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="none"
            keyboardAppearance={theme === darkTheme ? "dark" : "light"}
            value={value}
            onChangeText={onInputChange}
            multiline
            textAlignVertical="top"
            style={{ minHeight: 100, maxHeight: 600 }}
          />
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Input;
