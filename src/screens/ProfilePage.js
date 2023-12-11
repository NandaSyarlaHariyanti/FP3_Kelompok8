import { faFemale, faMale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { View, Dimensions, Text, TextInput, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const ProfilePage = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [gender, setGender] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const userProfile = await AsyncStorage.getItem("userProfile");
        const isLogin = await AsyncStorage.getItem("isLoggedIn");
        const userConvertToString = JSON.parse(userProfile);
        const isLoginConvert = JSON.parse(isLogin);
        setFullName(userConvertToString.fullName);
        setEmail(userConvertToString.email);
        setPhoneNum(userConvertToString.phoneNum);
        setGender(userConvertToString.gender);
        setIsLoggedIn(isLoginConvert);
      } catch (error) {
        console.log(error);
      }
    };

    getProfileData();
  }, []);

  const setProfileData = async () => {
    const dataUser = {
      fullName,
      email,
      phoneNum,
      gender,
    };

    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(dataUser));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", JSON.stringify(false));
      navigation.navigate("Home", { screen: "SearchForm" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        backgroundColor: "#e9e9e9",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      {isLoggedIn == true ? (
        <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold" }}>
            My Account
          </Text>
          <TextInput
            placeholder="Full Name"
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
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            onBlur={setProfileData}
          />
          <TextInput
            placeholder="Email"
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
            onChangeText={(text) => setEmail(text)}
            onBlur={setProfileData}
            value={email}
          />
          <TextInput
            placeholder="Phone Number"
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
            inputMode="numeric"
            onChangeText={(text) => setPhoneNum(text)}
            onBlur={setProfileData}
            value={phoneNum}
          />
          <View
            style={{
              width: screenWidth * 0.9,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              style={{
                height: 56,
                width: screenWidth * 0.4,
                backgroundColor: gender === "L" ? "#F875AA" : "#fff",
                borderWidth: 2,
                borderRadius: 8,
                borderColor: "#999",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setGender("L");
                setProfileData();
              }}
            >
              <FontAwesomeIcon
                icon={faMale}
                color={gender === "L" ? "#fff" : "#333"}
              />
              <Text
                style={{
                  color: gender === "L" ? "#fff" : "#000",
                  fontWeight: "bold",
                  marginLeft: 12,
                }}
              >
                Laki-Laki
              </Text>
            </Pressable>
            <Pressable
              style={{
                height: 56,
                width: screenWidth * 0.4,
                backgroundColor: gender === "P" ? "#F875AA" : "#fff",
                borderWidth: 2,
                borderRadius: 8,
                borderColor: "#999",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setGender("P");
                setProfileData();
              }}
            >
              <FontAwesomeIcon
                icon={faFemale}
                color={gender === "P" ? "#fff" : "#333"}
              />
              <Text
                style={{
                  color: gender === "P" ? "#fff" : "#000",
                  fontWeight: "bold",
                  marginLeft: 12,
                }}
              >
                Perempuan
              </Text>
            </Pressable>
          </View>
          <Text
            style={{
              color: "#000",
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 48,
            }}
          >
            Support
          </Text>
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 48,
              paddingVertical: 12,
              backgroundColor: "#F875AA",
              borderRadius: 8,
            }}
            onPress={handleLogout}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 48,
            paddingVertical: 12,
            backgroundColor: "#F875AA",
            borderRadius: 8,
          }}
          onPress={() =>
            navigation.navigate("LoginPage", {
              loginFrom: "Profile",
            })
          }
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default ProfilePage;
