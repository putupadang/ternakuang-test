import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import index from "../views/pages/index";
import detail from "../views/pages/detail";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen
          options={{
            headerTitle: () => (
              <Text style={{ fontSize: 23, color: "#fff", fontWeight: "bold" }}>Insight</Text>
            ),
            headerStyle: { backgroundColor: "#000" },
          }}
          name="index"
          component={index}
        />
        <Stack.Screen
          options={{
            headerBackVisible: true,
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#000", color: "#fff" },
            title: "",
          }}
          name="detail"
          component={detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
