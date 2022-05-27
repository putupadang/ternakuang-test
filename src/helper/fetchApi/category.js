import variables from "../../variables";
const value = variables();

export const fetchApiGetNewsCategories = (res) => {
  fetch(value.env.api_url + "news/news_categories", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.hasOwnProperty("message") && responseJson.message == "OK") {
        res({ resVal: responseJson });
      } else {
        res(JSON.stringify(responseJson.message).replace(/[^a-zA-Z ]/g, ""));
      }
    });
};
