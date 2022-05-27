import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Image, ScrollView, useWindowDimensions, ActivityIndicator } from "react-native";
import RenderHtml from "react-native-render-html";
import { fetchApiGetNewsById } from "../../helper/fetchApi/news";
import { casualDate } from "../../helper/dateFormat";

const Detail = () => {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const [newsDetail, setNewsDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const getNewsDetail = () => {
    let params = {
      news_id: route.params.id,
    };

    setLoading(true);
    fetchApiGetNewsById(params, (res) => {
      if (res.hasOwnProperty("resVal")) {
        setNewsDetail(res.resVal.data);
      } else {
        console.log(res);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getNewsDetail();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ScrollView>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>{newsDetail.title}</Text>
            <Text style={{ color: "grey", marginTop: 10 }}>
              Terakhir Update {casualDate(newsDetail.published_date)}
            </Text>
          </View>
          <View style={{ width: "100%", marginVertical: 10 }}>
            <Image style={{ width: "100%", height: 200 }} source={{ uri: newsDetail.thumbnail_url }} />
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <RenderHtml
              contentWidth={width}
              source={{
                html: `${newsDetail.description}`,
              }}
              tagsStyles={{
                p: {
                  fontSize: 16,
                  color: "#fff",
                },
                h1: {
                  color: "#fff",
                },
                h2: {
                  color: "#fff",
                },
                h3: {
                  color: "#fff",
                },
                h4: {
                  color: "#fff",
                },
                h5: {
                  color: "#fff",
                },
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Detail;
