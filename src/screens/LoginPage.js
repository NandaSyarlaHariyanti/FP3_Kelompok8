// LoginPage.js
import React, { useState } from "react";
import { View, Text, TextInput, Dimensions, Pressable } from "react-native";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose, faWarning } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const LoginPage = ({ navigation, route }) => {
  const { loginFrom, fee, hotelName, city, addressLine } = route.params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("none");
  const setIsLoggedTrue = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
      console.log(await AsyncStorage.getItem("isLoggedIn"));
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async () => {
    if (username === "user" && password === "inipassworduser") {
      if (loginFrom === "DetailPage") {
        await setIsLoggedTrue();
        navigation.navigate("BookingForm", {
          fee,
          hotelName,
          city,
          addressLine,
        });
      } else {
        await setIsLoggedTrue();
        navigation.navigate("Home", { screen: "SearchForm" });
      }
    } else {
      setIsError("flex");
    }
  };

  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Navbar width={screenWidth} height={360} bgColor={"#F875AA"} />
      <View
        style={{
          height: screenHeight - 360,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: 16,
        }}
      >
        <View
          style={{
            marginTop: 16,
            height: 72,
            width: screenWidth * 0.9,
            backgroundColor: "#EF4040",
            display: `${isError}`,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 24,
            borderRadius: 8,
            marginBottom: -32,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FontAwesomeIcon icon={faWarning} color="#fff" size={24} />
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
              Username/Password salah
            </Text>
          </View>
          <Pressable onPress={() => setIsError("none")}>
            <FontAwesomeIcon icon={faClose} color="#fff" size={24} />
          </Pressable>
        </View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textDecorationLine: "underline",
            marginTop: 32,
          }}
        >
          Login
        </Text>
        <TextInput
          placeholder="Username"
          style={{
            borderWidth: 2,
            borderColor: "#999",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: "#ffffff",
            elevation: 8,
            width: screenWidth * 0.9,
          }}
          onChangeText={(e) => setUsername(e)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={{
            borderWidth: 2,
            borderColor: "#999",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: "#ffffff",
            elevation: 8,
            width: screenWidth * 0.9,
          }}
          onChangeText={(e) => setPassword(e)}
        />
        <Pressable
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#F875AA",
            paddingHorizontal: 36,
            paddingVertical: 12,
            borderRadius: 8,
          }}
          onPress={() => handleLogin()}
        >
          <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginPage;
