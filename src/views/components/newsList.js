import React from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { dateFormat } from "../../helper/dateFormat";

const NewsList = ({ loading, loadMore }) => {
  const newsList = useSelector((state) => state.news.data);
  const navigation = useNavigation();

  const itemComponent = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("detail", { id: item.id })}
        key={index}
        activeOpacity={0.5}
        style={{ flexDirection: "row", paddingHorizontal: 10, width: "100%", marginVertical: 10 }}
      >
        <View style={{ height: 100, width: 100, borderRadius: 5 }}>
          <Image
            source={{ uri: item.thumbnail_url }}
            style={{ height: "100%", width: "100%", borderRadius: 5 }}
          />
        </View>
        <View style={{ justifyContent: "space-between", marginLeft: 10, width: "68%" }}>
          <Text style={{ color: "#fff", fontSize: 16 }}>{item.title}</Text>
          <Text style={{ color: "grey", fontSize: 13 }}>{dateFormat(item.published_date)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      {loading && <ActivityIndicator size="large" color="grey" />}
      <FlatList
        data={newsList}
        renderItem={itemComponent}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={() => loadMore()}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default NewsList;
