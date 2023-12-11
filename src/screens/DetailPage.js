// DetailPage.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, Dimensions, Image, Pressable } from "react-native";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLocationDot,
  faLocationPinLock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const DetailPage = ({ navigation, route }) => {
  const { hotel_id } = route.params;
  const [dataDetailHotel, setDataDetailHotel] = useState({});

  const get_data_detail_hotel = async () => {
    try {
      const response = await axios.post(
        "https://hotels4.p.rapidapi.com/properties/v2/detail",
        {
          currency: "USD",
          eapid: 1,
          locale: "en_US",
          siteId: 300000001,
          propertyId: hotel_id,
        },
        {
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
              "618f625b2cmsh0ced461be5a1658p1e19e7jsndfedc651e982",
            "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
          },
        }
      );
      setDataDetailHotel({
        hotelName: response.data.data.propertyInfo.summary.name,
        hotelImage:
          response.data.data.propertyInfo.propertyGallery.images[0].image.url,
        hotelRating:
          response.data.data.propertyInfo.summary.overview.propertyRating ===
          null
            ? 0
            : response.data.data.propertyInfo.summary.overview.propertyRating
                .rating,
        city: response.data.data.propertyInfo.summary.location.address.city,
        addressLine:
          response.data.data.propertyInfo.summary.location.address.addressLine,
        fee:
          response.data.data.propertyInfo.summary.fees === null
            ? Math.floor(Math.random() * (150 - 120 + 1)) + 120
            : response.data.data.propertyInfo.summary.fees,
        aboutHotel:
          response.data.data.propertyInfo.propertyContentSectionGroups
            .aboutThisProperty.sections[0].bodySubSections[0].elements[0]
            .items[0].content.text,
      });
    } catch (error) {
      console.warn(error.message);
    }
  };

  useEffect(() => {
    get_data_detail_hotel();
    console.log(hotel_id);
  }, [hotel_id]);

  const handleBookHotel = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      const isLogin = JSON.parse(isLoggedIn);
      console.log(isLogin);
      if (isLogin === true) {
        navigation.navigate("BookingForm", {
          fee: dataDetailHotel.fee,
          hotelName: dataDetailHotel.hotelName,
          city: dataDetailHotel.city,
          addressLine: dataDetailHotel.addressLine,
        });
      } else {
        navigation.navigate("LoginPage", {
          loginFrom: "DetailPage",
          fee: dataDetailHotel.fee,
          hotelName: dataDetailHotel.hotelName,
          city: dataDetailHotel.city,
          addressLine: dataDetailHotel.addressLine,
        });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        marginTop: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          position: "absolute",
          height: 64,
          width: screenWidth,
          backgroundColor: "#F875AA",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          zIndex: 1,
          opacity: 0.7,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 24 }}>
          Hotel Detail
        </Text>
      </View>
      <Image
        source={{
          uri: dataDetailHotel.hotelImage,
          width: screenWidth,
          height: 280,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: screenWidth,
          borderBottomEndRadius: 24,
          borderBottomStartRadius: 24,
          elevation: 16,
          shadowColor: "#333",
          backgroundColor: "#fff",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            width: screenWidth * 0.7,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingHorizontal: 24,
            paddingTop: 8,
            paddingBottom: 24,
            gap: 4,
          }}
        >
          <Text style={{ color: "#333", fontSize: 24, fontWeight: "bold" }}>
            {dataDetailHotel.hotelName}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FontAwesomeIcon icon={faLocationDot} color={"#333"} />
            <Text style={{ color: "#333", fontSize: 14, fontWeight: "500" }}>
              {dataDetailHotel.addressLine}, {dataDetailHotel.city}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FontAwesomeIcon icon={faStar} color={"#333"} />
            <Text style={{ color: "#333", fontSize: 14, fontWeight: "500" }}>
              {dataDetailHotel.hotelRating}/5
            </Text>
          </View>
        </View>
        <View
          style={{
            width: screenWidth * 0.3,
            height: 120,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "baseline",
              backgroundColor: "#F875AA",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderBottomLeftRadius: 24,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
              Rp. {dataDetailHotel.fee}.
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
              000,-
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          width: screenWidth * 0.925,
          marginTop: 16,
          elevation: 20,
          shadowColor: "#000",
          borderRadius: 24,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#000",
            textDecorationLine: "underline",
            marginBottom: 16,
          }}
        >
          Tentang Hotel
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            fontStyle: "normal",
            letterSpacing: 0.5,
          }}
        >
          {dataDetailHotel.aboutHotel}
        </Text>
      </View>
      <Pressable
        style={{
          position: "absolute",
          bottom: 48,
          backgroundColor: "#F875AA",
          paddingVertical: 20,
          paddingHorizontal: 72,
          borderRadius: 50,
          elevation: 16,
          shadowColor: "#000",
        }}
        onPress={() => handleBookHotel()}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Book this Hotel
        </Text>
      </Pressable>
    </View>
  );
};

export default DetailPage;
