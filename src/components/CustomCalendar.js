import React, { useState, useEffect } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {colorOptions1, colorOptions2, colorOptions3, colorOptions4} from '../screens/OptionScreen'


LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: ["일", "월", "화", "수", "목", "금", "토"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
};

LocaleConfig.defaultLocale = "ko";

const CustomCalendar = ({ onDateSelect, refreshCalendar }) => {
  const [selected, setSelected] = useState("");
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const colorOption = await AsyncStorage.getItem('colorOptions');
        const colorOptionData = JSON.parse(colorOption);
        const markedDates = {};
        await Promise.all(
          keys.map(async (key) => {
            if (key !== "selectedDate" && key !== "colorOptions") {
              const value = await AsyncStorage.getItem(key);
              if (value) {
                const { color } = JSON.parse(value);
                let colorValue = "";
                if(colorOptionData.colorOptionSelect==1)
                {
                  colorValue = colorOptions1[color-1].code;
                } 
                else if(colorOptionData.colorOptionSelect==2)
                {
                  colorValue = colorOptions2[color-1].code;
                }
                else if(colorOptionData.colorOptionSelect==3)
                {
                  colorValue = colorOptions3[color-1].code;
                }
                else if(colorOptionData.colorOptionSelect==4)
                {
                  colorValue = colorOptions4[color-1].code;
                }
                markedDates[key] = {
                  selected: true,
                  disableTouchEvent: false,
                  selectedColor: colorValue === "none" ? "grey" : colorValue,
                };
              }
            }
          })
        );

        setMarkedDates(markedDates);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refreshCalendar]);

  return (
    <Calendar
      style={{
        borderWidth: 0,
        borderColor: "black",
        height: 380,
        width: 400,
        margin: 20,
      }}
      theme={{
        backgroundColor: "#101010",
        calendarBackground: "#101010",
        backgroundColor: "#101010",
        selectedDayBackgroundColor: "grey",
        dayTextColor: "white",
        textDisabledColor: "#1A7890",
        textMonthFontWeight: "bold",
        monthTextColor: "white",
      }}
      onDayPress={(day) => {
        setSelected(day.dateString);
        onDateSelect(day.dateString);
      }}
      markedDates={{
        ...markedDates,
      }}
      hideExtraDays={true}
      monthFormat={"M월"}
    />
  );
};

export default CustomCalendar;
