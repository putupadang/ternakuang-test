import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useSelector } from "react-redux";

const CategoryList = ({ categorySelected, setCategorySelected }) => {
  const categoryData = useSelector((state) => state.category.data);

  const itemComponent = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => setCategorySelected(item.id)}
        key={index}
        activeOpacity={0.5}
        style={{
          borderColor: "#fff",
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 8,
          paddingVertical: 2,
          marginRight: 5,
          marginLeft: 5,
          backgroundColor: categorySelected == item.id ? "grey" : "#000",
        }}
      >
        <Text style={{ color: "white" }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        paddingVertical: 10,
        borderTopColor: "grey",
        borderBottomColor: "grey",
        borderWidth: 0.2,
      }}
    >
      <FlatList
        data={categoryData}
        renderItem={itemComponent}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export default CategoryList;
