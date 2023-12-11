import { View, Image, Text } from "react-native";

const Navbar = ({ width, height, bgColor }) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
        gap: 16,
      }}
    >
      <Image
        source={{
          uri: "https://i.pinimg.com/originals/28/db/d4/28dbd4f450dfa1e8dc91aa85dbe16253.png",
        }}
        style={{
          width: 56,
          height: 56,
          resizeMode: "repeat",
          borderRadius: 64,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
          textTransform: "capitalize",
        }}
      >
        Sebuah {`\n`}Hotel
      </Text>
    </View>
  );
};

export default Navbar;
