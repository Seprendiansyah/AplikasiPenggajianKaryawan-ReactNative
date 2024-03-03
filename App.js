import "react-native-gesture-handler";

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import ListBelanja from "./components/ListBelanja";
import FormSignIn from "./components/FormSignIn";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenHome from "./screens/ScreenHome";
import ScreenAbout from "./screens/ScreenAbout";
import { CONTEXT_APP } from "./settings";
import ScreenAuthSignIn from "./screens/auth/ScreenAuthSignIn";
import ScreenMain from "./screens/main/ScreenMain";
import ScreenKaryawanList from "./screens/karyawan/ScreenKaryawanList";
import ScreenKaryawanDetail from "./screens/karyawan/ScreenKaryawanDetail";
import ScreenKaryawanCreate from "./screens/karyawan/ScreenKaryawanCreate";

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <CONTEXT_APP.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ScreenMain"
            component={ScreenMain}
            options={{ title: "Main", headerShown: false }}
          />
          <Stack.Screen
            name="ScreenKaryawanList"
            component={ScreenKaryawanList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenKaryawanDetail"
            component={ScreenKaryawanDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenKaryawanCreate"
            component={ScreenKaryawanCreate}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="ScreenTerimaList"
            component={ScreenTerimaList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenTerimaCreate"
            component={ScreenTerimaCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenTerimaDetail"
            component={ScreenTerimaDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenKasList"
            component={ScreenKasList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenKasCreate"
            component={ScreenKasCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenKasDetail"
            component={ScreenKasDetail}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen name="ScreenAbout" component={ScreenAbout} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" hidden={true} />
    </CONTEXT_APP.Provider>
  );
};

// mobile RN
// jika direction = vertical
// maka justify content = vertical (sumbu y)
// dan maka align items = horizontal (sumbu x)

// web
// jika direction = horizontal
// maka justify content = horizontal (sumbu x)
// dan maka align items = vertikal (sumbu y)
export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    height: "100%",
  },
  textHeading1: {
    fontSize: 20,
    color: "#000088",
  },

  btn: {
    border: 1,
    padding: 16,
    backgroundColor: "red",
  },

  btnText: {
    color: "white",
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
