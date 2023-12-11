import { useState } from "react";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const BookingForm = ({ navigation, route }) => {
  const { fee, hotelName, city, addressLine } = route.params;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [longBook, setLongBook] = useState(1);
  const [totalGuest, setTotalGuest] = useState(1);
  const [totalPay, setTotalPay] = useState(0);

  const handleSubmit = async () => {
    try {
      // Mendapatkan data yang ada di AsyncStorage
      const existingData =
        JSON.parse(await AsyncStorage.getItem("bookingDatas")) || [];

      console.log(existingData);
      // Menambahkan data baru ke array existingData
      const newData = {
        fullName,
        email,
        phoneNum,
        longBook,
        totalGuest,
        totalPay: fee * longBook,
        fee,
        hotelName,
        city,
        addressLine,
      };

      existingData.push(newData);

      // Menyimpan array data yang telah diperbarui kembali ke AsyncStorage
      await AsyncStorage.setItem("bookingDatas", JSON.stringify(existingData));

      // Mengambil data yang sudah diperbarui dari AsyncStorage
      const updatedData = JSON.parse(
        await AsyncStorage.getItem("bookingDatas")
      );
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: screenWidth,
        height: screenHeight,
        marginTop: 32,
      }}
    >
      <View
        style={{
          width: screenWidth,
          height: 72,
          backgroundColor: "#F875AA",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} color="#fff" />
        </Pressable>
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Booking Now
        </Text>
        <Text></Text>
      </View>
      <View
        style={{
          height: screenHeight - 72,
          width: screenWidth,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 16,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Contact Information
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
            onChangeText={(e) => setFullName(e)}
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
            onChangeText={(e) => setEmail(e)}
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
            onChangeText={(e) => setPhoneNum(e)}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 24,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 20,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Price Summary
          </Text>
          <TextInput
            placeholder="Long Day Booking"
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
            onChangeText={(e) => setLongBook(e)}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="Total Guest"
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
            keyboardType="number-pad"
            onChangeText={(e) => setTotalGuest(e)}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Total</Text>
            <TextInput
              placeholder={`Rp. ${fee * longBook}.000,-`}
              placeholderTextColor={"#000"}
              style={{
                borderWidth: 2,
                borderColor: "#999",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: "#ffffff",
                elevation: 8,
                width: screenWidth * 0.7,
              }}
              editable={false}
            />
          </View>
        </View>
      </View>
      <Pressable
        style={{
          position: "absolute",
          bottom: 56,
          right: 24,
          backgroundColor: "#F875AA",
          paddingHorizontal: 48,
          paddingVertical: 12,
          borderRadius: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
        onPress={() => handleSubmit()}
      >
        <FontAwesomeIcon icon={faCheck} color="#fff" size={24} />
        <Text style={{ color: "#fff" }}>SUBMIT</Text>
      </Pressable>
    </View>
  );
};

export default BookingForm;
