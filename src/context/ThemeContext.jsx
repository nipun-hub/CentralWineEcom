import { createContext, useState } from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export const ThemeContext = createContext();

const sharedColors = {
  red950: '#560015',
  red500: '#FF114C',
  gold950: '#442604',
  gold700: '#A67102',
};

const themes = {
  light: {
    ...sharedColors,
    name: 'light',
    background: "#ffffff",
    sectionBackground: "#ffffff",
    footerBackground: '#2A2A2A',
    footerTextColor: '#FFFFFF',
    textColor: "#000000",
    topicTextColor: "#000000",
    sliderTrack: "#EA7C69",
    sliderHandle: "#EA7C69",
    checkboxText: "#000000",
    cardBackground: "#ffffff",
    buttonBackground: "#3D3D3D",
    buttonBackground2: "#000000",
    buttonText: "#ffffff",
    icon: <MoonOutlined />,
  },
  dark: {
    ...sharedColors,
    name: 'dark',
    // background: "#1E1E1E",
    background: "#060D0D",
    footerBackground: '#2A2A2A',
    footerTextColor: '#FFFFFF',
    sectionBackground: "#000000",
    textColor: "#ffffff",
    topicTextColor: "#FFFFE7",
    sliderTrack: "#EA7C69",
    sliderHandle: "#EA7C69",
    checkboxText: "#ffffff",
    cardBackground: "#303030",
    buttonBackground: "#D1D1D1",
    buttonBackground2: "#D1D1D1",
    buttonText: "#000000",
    icon: <SunOutlined />,
  },
};

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
