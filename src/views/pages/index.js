import React, { useEffect, useState } from "react";
import { View } from "react-native";
import CategoryList from "../components/categoryList";
import { fetchApiGetNewsCategories } from "../../helper/fetchApi/category";
import { useDispatch, useSelector } from "react-redux";
import { insertCategoryData } from "../../redux/reducers/category";
import NewsList from "../components/newsList";
import { fetchApiGetAllNews, fetchApiGetAllNewsByCat } from "../../helper/fetchApi/news";
import { handleCategoryTemp, handleGetAll, insertNewsData } from "../../redux/reducers/news";

const Index = () => {
  const dispatch = useDispatch();
  const currentNewsList = useSelector((state) => state.news.data);
  const { isGetAll, categoryTemp } = useSelector((state) => state.news);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [categorySelected, setCategorySelected] = useState(-1);

  const getCategoryList = () => {
    fetchApiGetNewsCategories((res) => {
      if (res.hasOwnProperty("resVal")) {
        let categoryList = [{ id: -1, name: "Semua" }, ...res.resVal.data];
        dispatch(insertCategoryData(categoryList));
      } else {
        console.log(res);
      }
    });
  };

  const getNewsList = (loadMore = false) => {
    let _page = loadMore ? currentPage + 1 : 1;
    if (!isGetAll) {
      _page = 1;
      setCurrentPage(1);
    } else {
      setCurrentPage(_page);
    }

    let params = {
      page: _page,
      limit: 15,
    };

    setIsLoading(true);
    fetchApiGetAllNews(params, (res) => {
      if (res.hasOwnProperty("resVal")) {
        if (isGetAll) {
          let _newsList = [...currentNewsList, ...res.resVal.data];
          dispatch(insertNewsData(_newsList));
        } else {
          let _newsList = [...res.resVal.data];
          dispatch(insertNewsData(_newsList));
          dispatch(handleGetAll(true));
        }
      } else {
        console.log(res);
      }
      setIsLoading(false);
    });
  };

  const getNewsListByCat = (loadMore = false) => {
    let _page = loadMore ? currentPage + 1 : 1;
    if (isGetAll || categoryTemp !== categorySelected) {
      _page = 1;
      setCurrentPage(_page);
    } else {
      setCurrentPage(_page);
    }

    let params = {
      category_id: categorySelected,
      page: _page,
      limit: 15,
    };

    setIsLoading(true);
    fetchApiGetAllNewsByCat(params, (res) => {
      if (res.hasOwnProperty("resVal")) {
        if (isGetAll || categoryTemp !== categorySelected) {
          let _newsList = [...res.resVal.data];
          dispatch(insertNewsData(_newsList));
          dispatch(handleGetAll(false));
          dispatch(handleCategoryTemp(categorySelected));
        } else {
          let _newsList = [...currentNewsList, ...res.resVal.data];
          dispatch(insertNewsData(_newsList));
        }
      } else {
        console.log(res);
      }
      setIsLoading(false);
    });
  };

  const doLoadMore = () => {
    if (isGetAll) {
      getNewsList(true);
    } else {
      getNewsListByCat(true);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (categorySelected == -1) {
      getNewsList();
    } else {
      getNewsListByCat();
    }
  }, [categorySelected]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        backgroundColor: "#000",
      }}
    >
      <CategoryList categorySelected={categorySelected} setCategorySelected={setCategorySelected} />
      <NewsList loading={isLoading} loadMore={() => doLoadMore()} />
    </View>
  );
};

export default Index;
