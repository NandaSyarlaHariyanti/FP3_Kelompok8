// SearchForm.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import DateTimePicker from "react-native-ui-datepicker";
import {
  faCloudMoon,
  faLandmark,
  faLocation,
  faLocationDot,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const CardPopularDestination = ({ specialKey, title, category }) => {
  return (
    <View
      key={specialKey}
      style={{
        width: 160,
        height: 200,
        backgroundColor: "#F875AA",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <FontAwesomeIcon
        icon={
          category === "RESTAURANT"
            ? faUtensils
            : category === "SIGHTS"
            ? faLandmark
            : category === "NIGHTLIFE"
            ? faCloudMoon
            : faLocation
        }
        size={72}
        color="#fff"
      />
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
        {title}
      </Text>
    </View>
  );
};

const SearchForm = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [allCities, setAllCities] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const screenHeight = Dimensions.get("screen").height;
  const screenWidth = Dimensions.get("screen").width;

  const get_data_popular_destination = async () => {
    try {
      const response = await axios.get(
        "https://test.api.amadeus.com/v1/reference-data/locations/pois",
        {
          params: {
            latitude: 41.397158,
            longitude: 2.160873,
            radius: 1,
            page: {
              limit: 10,
              offset: 0,
            },
          },
          headers: {
            Authorization: "Bearer Xyugg6XzKjMFAcB4uD831SOSQlzA",
          },
        }
      );
      const datas = await response.data.data;
      if (
        popularDestinations.length < datas.length &&
        popularCategories < datas.length
      ) {
        for (let i = 0; i < datas.length; i++) {
          const element = datas[i];
          const popularCategory = element.category;
          const popularDestination = element.name;
          popularDestinations.push(popularDestination);
          popularCategories.push(popularCategory);
        }
      }
      return popularDestinations, popularCategories, setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 403) {
        console.error(
          "Access to the resource is forbidden. Check API key and permissions."
        );
      } else {
        console.error(error.response);
      }
    }
  };

  const get_popular_city = async () => {
    try {
      const response = await axios.get(
        "https://hotels4.p.rapidapi.com/locations/v3/search",
        {
          params: {
            q: "Indonesia",
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
      const datas = await response.data.sr;
      if (allCities.length < datas.length) {
        for (let index = 0; index < datas.length; index++) {
          const element = datas[index];
          const regionName = element.regionNames.primaryDisplayName;
          allCities.push(regionName);
        }
      }
      await get_data_popular_destination();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 403) {
        console.error(
          "Access to the resource is forbidden. Check API key and permissions."
        );
      } else {
        console.error(error.response);
      }
    }
  };

  useEffect(() => {
    get_popular_city();
  }, [allCities]);

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
      <ScrollView
        style={{
          height: screenHeight,
          backgroundColor: "#ffffff",
          marginBottom: 72,
        }}
      >
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
            placeholder="Cari Hotel Berdasarkan Nama Kota atau Negara"
            placeholderTextColor={"#999"}
            value={searchText}
            onChangeText={setSearchText}
            style={{
              borderWidth: 2,
              borderColor: "#999",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: "#ffffff",
              elevation: 8,
            }}
          />
          <Pressable
            onPress={() =>
              navigation.navigate("SearchResult", { searchInput: searchText })
            }
            style={{
              width: "auto",
              backgroundColor: "#F875AA",
              height: 48,
              borderRadius: 24,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Cari
            </Text>
          </Pressable>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          Kota-kota Populer di Indonesia
        </Text>
        <ScrollView
          horizontal
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            margin: 20,
            overflow: "scroll",
            gap: 4,
          }}
        >
          {!loading && allCities.length > 0 ? (
            allCities.map((data, key) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    marginRight: 10,
                    backgroundColor: "#F875AA",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                  }}
                  key={key}
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size={16}
                    color="#fff"
                  />
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    {data}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text>Data Sedang Dimuat</Text>
          )}
        </ScrollView>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          Destinasi Wisata
        </Text>
        <ScrollView
          horizontal
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            margin: 20,
            overflow: "scroll",
            gap: 20,
          }}
        >
          {loading ? (
            <Text>Data Sedang Dimuat</Text>
          ) : (
            popularDestinations.map((data, key) => {
              return (
                <CardPopularDestination
                  specialKey={key}
                  title={popularDestinations[key]}
                  category={popularCategories[key]}
                />
              );
            })
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default SearchForm;
