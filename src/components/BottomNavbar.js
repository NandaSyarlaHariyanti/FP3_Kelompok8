import React, { useState, useEffect } from "react";
import { Text, View, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SearchForm from "../screens/SearchForm";
import BookingSummary from "../screens/BookingSummary";
import ProfilePage from "../screens/ProfilePage";
import WishListPage from "../screens/WishListPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBed,
  faHeart,
  faHome,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const BottomNav = ({ route, navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderWidth: 2,
          borderColor: "#fffffff",
          borderRadius: 0,
          backgroundColor: "#FF90BC",
          position: "absolute",
          height: 75,
          bottom: 0,
          paddingHorizontal: 5,
          width: screenWidth,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#a3a3a3",
      }}
    >
      <Tab.Screen
        name="SearchForm"
        component={SearchForm}
        initialParams={{}}
        options={{
          headerShown: false,
          tabBarLabel: "Beranda",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon icon={faHome} color="#fff" />
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 3,
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                Beranda
              </Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="WishListPage"
        component={WishListPage}
        initialParams={{}}
        options={{
          headerShown: false,
          tabBarLabel: "WishListPage",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon icon={faHeart} color="#fff" />
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 3,
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                Wishlist
              </Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="BookingSummary"
        component={BookingSummary}
        initialParams={{}}
        options={{
          headerShown: false,
          tabBarLabel: "Booking",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon icon={faBed} color="#fff" />
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 3,
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                Booking
              </Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        initialParams={{}}
        options={{
          headerShown: false,
          tabBarLabel: "Booking",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon icon={faUserAlt} color="#fff" />
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 3,
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                Profile
              </Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNav;
