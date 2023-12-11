import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import Navbar from "../components/Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeartCircleCheck,
  faHotel,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const CardSearchHotel = ({
  specialKey,
  hotelName,
  hotelAddress,
  isLiked,
  functionOnPress,
  functionOnLike,
}) => {
  console.log(isLiked);
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
      onPress={functionOnPress}
      key={specialKey}
    >
      <View
        style={{
          width: (screenWidth - 32) * 0.25,
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
          width: (screenWidth - 32) * 0.5,
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
            {hotelAddress.street}, {hotelAddress.city}
            {""}
            {hotelAddress.province === "" ? "" : ","} {hotelAddress.province}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: (screenWidth - 32) * 0.25,
          height: 96,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={functionOnLike}>
          <FontAwesomeIcon
            icon={isLiked ? faHeartCircleCheck : faHeart}
            size={32}
            color={isLiked ? "#EF4040" : "#000"}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

const SearchResult = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState("");
  const [searchHotelResults, setSearchHotelResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [wishlistDatas, setWishlistDatas] = useState([]);

  const { searchInput } = route.params;

  const getSearchHotelResults = async () => {
    try {
      const response = await axios(
        "https://hotels4.p.rapidapi.com/locations/v3/search",
        {
          params: {
            q: searchInput, // Menggunakan searchInput bukan searchText
            locale: "en_US",
            langid: "1033",
            siteid: "300000001",
          },
          headers: {
            "X-RapidAPI-Key":
              "618f625b2cmsh0ced461be5a1658p1e19e7jsndfedc651e982",
            "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
          },
        }
      );
      const datas = response.data.sr;
      setSearchHotelResults(datas);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getWishlistUser = async () => {
    try {
      const wishlistUserDatas = await AsyncStorage.getItem("wishlistDatas");
      const wishlistDatasConverted = JSON.parse(wishlistUserDatas);
      for (let i = 0; i < wishlistDatasConverted.length; i++) {
        const element = wishlistDatasConverted[i].hotelId;
        wishlistDatas.push(element);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlistUser = async ({
    hotelId,
    hotelName,
    hotelStreet,
    hotelCity,
    hotelProvince,
  }) => {
    try {
      const existingData =
        JSON.parse(await AsyncStorage.getItem("wishlistDatas")) || [];
      console.log(existingData);
      const newData = {
        hotelId,
        hotelName,
        hotelStreet,
        hotelCity,
        hotelProvince,
      };
      existingData.push(newData);
      await AsyncStorage.setItem("wishlistDatas", JSON.stringify(existingData));
      const updatedData = JSON.parse(
        await AsyncStorage.getItem("wishlistDatas")
      );
      getSearchHotelResults();
      getWishlistUser();
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  useEffect(() => {
    setSearchText(searchInput);
    setIsLoaded(false);
    getSearchHotelResults();
    getWishlistUser();
  }, [searchInput]);

  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar width={screenWidth} height={96} bgColor={"#F875AA"} />
      <View
        style={{
          padding: 16,
          borderRadius: 8,
          backgroundColor: "#ffffff",
          elevation: 12,
          shadowColor: "#F875AA",
          width: "auto",
          margin: 20,
          gap: 16,
        }}
      >
        <TextInput
          placeholder={searchInput}
          placeholderTextColor={"#000"}
          style={{
            borderWidth: 2,
            borderColor: "#999",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: "#ffffff",
            elevation: 8,
          }}
          editable={false}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          height: "auto",
          backgroundColor: "#ffffff",
          paddingVertical: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoaded && searchHotelResults.length > 0 ? (
          searchHotelResults.map((data, key) => {
            if (data.type === "HOTEL") {
              return (
                <CardSearchHotel
                  specialKey={key}
                  hotelName={data.regionNames.primaryDisplayName}
                  functionOnPress={() =>
                    navigation.navigate("DetailPage", {
                      hotel_id: data.hotelId,
                    })
                  }
                  functionOnLike={() =>
                    addToWishlistUser({
                      hotelId: data.hotelId,
                      hotelName: data.regionNames.primaryDisplayName,
                      hotelStreet: data.hotelAddress.street,
                      hotelCity: data.hotelAddress.city,
                      hotelProvince: data.hotelAddress.province,
                    })
                  }
                  key={key}
                  isLiked={wishlistDatas.includes(data.hotelId)}
                  hotelAddress={data.hotelAddress}
                />
              );
            }
          })
        ) : (
          <Text>Data sedang diload</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchResult;
