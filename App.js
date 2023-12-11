// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import SearchForm from "./src/screens/SearchForm";
import BottomNav from "./src/components/BottomNavbar";
import DetailPage from "./src/screens/DetailPage";
import SearchResult from "./src/screens/SearchResult";
import BookingForm from "./src/screens/BookingForm";
import LoginPage from "./src/screens/LoginPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerMode: false }}>
        <Stack.Screen name="Home" component={BottomNav} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
        <Stack.Screen name="SearchResult" component={SearchResult} />
        <Stack.Screen name="BookingForm" component={BookingForm} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
