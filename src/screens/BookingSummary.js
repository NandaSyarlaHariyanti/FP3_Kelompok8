// BookingSummary.js
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBed,
  faHotel,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const BookingSummary = () => {
  const [bookingDatas, setBookingDatas] = useState();
  const get_booking_summary_datas = async () => {
    try {
      const existingData =
        JSON.parse(await AsyncStorage.getItem("bookingDatas")) || [];
      setBookingDatas(existingData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_booking_summary_datas();
  }, []);
  console.log(bookingDatas);
  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 32,
      }}
    >
      <View
        style={{
          width: screenWidth,
          height: 72,
          backgroundColor: "#F875AA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 16,
          }}
        >
          Booking Summary
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          height: screenHeight,
          width: screenWidth,
          alignItems: "center",
          display: "flex",
          gap: 12,
          paddingTop: 16,
          paddingBottom: 72,
          backgroundColor: "#fff",
        }}
      >
        {bookingDatas &&
          bookingDatas.map((data, key) => {
            return (
              <View
                key={key}
                style={{
                  width: screenWidth * 0.9,
                  height: 96,
                  backgroundColor: "#fff",
                  borderWidth: 2,
                  borderColor: "#F875AA",
                  borderRadius: 16,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ width: 24, marginLeft: 16 }}>
                  <FontAwesomeIcon icon={faHotel} size={24} color="#F875AA" />
                </View>
                <View
                  style={{
                    width: screenWidth * 0.9 - 210,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textDecorationLine: "underline",
                    }}
                    numberOfLines={1}
                  >
                    {data.hotelName}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 4,
                    }}
                  >
                    <FontAwesomeIcon icon={faMapLocationDot} />
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                      {data.addressLine}, {data.city}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 4,
                    }}
                  >
                    <FontAwesomeIcon icon={faBed} />
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                      {data.longBook} hari & {data.totalGuest} orang
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#F875AA",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderTopLeftRadius: 24,
                    borderBottomLeftRadius: 24,
                    width: 140,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Rp. {data.totalPay}.000,-
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default BookingSummary;
