import { View, Dimensions, Text, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHotel, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const CardWishlistResult = ({ specialKey, hotelName, hotelAddress }) => {
  return (
    <Pressable
      style={{
        width: screenWidth - 32,
        height: 96,
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 3,
        borderColor: "#F875AA",
        marginVertical: 4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      key={specialKey}
    >
      <View
        style={{
          width: (screenWidth - 32) * 0.2,
          height: 96,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faHotel} size={32} color="#F875AA" />
      </View>
      <View
        style={{
          width: (screenWidth - 32) * 0.8,
          height: 96,
          padding: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: "bold", overflow: "hidden" }}
          numberOfLines={1}
        >
          {hotelName}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon icon={faLocationPin} size={20} color="#000" />
          <Text style={{ fontWeight: "500" }} numberOfLines={2}>
            {hotelAddress.hotelStreet}, {hotelAddress.hotelCity}
            {""}
            {hotelAddress.hotelProvince === "" ? "" : ","}{" "}
            {hotelAddress.hotelProvince}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const WishListPage = () => {
  const [wishlistDatas, setWishlistDatas] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const getWishlistDatas = async () => {
    try {
      const wishlistDatas = await AsyncStorage.getItem("wishlistDatas");
      const wishlistDatasConverted = JSON.parse(wishlistDatas);
      setWishlistDatas(wishlistDatasConverted);
      setIsLoaded(true);
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getWishlistDatas();
  }, []);
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
          My Wishlist
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          height: screenHeight,
          width: screenWidth,
          alignItems: "center",
          display: "flex",
          gap: 8,
          paddingTop: 16,
          backgroundColor: "#fff",
        }}
      >
        {isLoaded && wishlistDatas ? (
          wishlistDatas.map((data, key) => {
            return (
              <CardWishlistResult
                hotelName={data.hotelName}
                hotelAddress={{
                  hotelStreet: data.hotelStreet,
                  hotelCity: data.hotelCity,
                  hotelProvince: data.hotelProvince,
                }}
                specialKey={key}
                key={key}
              />
            );
          })
        ) : (
          <Text style={{ color: "#000" }}>Tidak ada data</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default WishListPage;
