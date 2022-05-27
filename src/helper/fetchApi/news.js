import variables from "../../variables";
const value = variables();

export const fetchApiGetAllNews = (params, res) => {
  fetch(value.env.api_url + "news?page=" + params.page + "&limit=" + params.limit, {
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
        res(JSON.stringify(responseJson.message));
      }
    });
};

export const fetchApiGetAllNewsByCat = (params, res) => {
  fetch(
    `${value.env.api_url}news_category/${params.category_id}/news?page=${params.page}&limit=${params.limit}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  )
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.hasOwnProperty("message") && responseJson.message == "OK") {
        res({ resVal: responseJson });
      } else {
        res(JSON.stringify(responseJson.message).replace(/[^a-zA-Z ]/g, ""));
      }
    });
};

export const fetchApiGetNewsById = (params, res) => {
  fetch(value.env.api_url + "news/" + params.news_id, {
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
