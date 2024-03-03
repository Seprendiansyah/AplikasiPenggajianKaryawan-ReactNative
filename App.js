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
import ScreenPotonganList from "./screens/potongan/ScreenPotonganList";
import ScreenPotonganCreate from "./screens/potongan/ScreenPotonganCreate";
import ScreenPotonganDetail from "./screens/potongan/ScreenPotonganDetail";
import ScreenJabatanCreate from "./screens/jabatan/ScreenJabatanCreate";
import ScreenJabatanList from "./screens/jabatan/ScreenJabatanList";
import ScreenJabatanDetail from "./screens/jabatan/ScreenJabatanDetail";
import ScreenDepartemenList from "./screens/departemen/ScreenDepartemenList";
import ScreenDepartemenCreate from "./screens/departemen/ScreenDepartemenCreate";
import ScreenDepartemenDetail from "./screens/departemen/ScreenDepartemenDetail";

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
          <Stack.Screen
            name="ScreenPotonganList"
            component={ScreenPotonganList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenPotonganCreate"
            component={ScreenPotonganCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenPotonganDetail"
            component={ScreenPotonganDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenDepartemenList"
            component={ScreenDepartemenList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenDepartemenCreate"
            component={ScreenDepartemenCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenDepartemenDetail"
            component={ScreenDepartemenDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenJabatanList"
            component={ScreenJabatanList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenJabatanCreate"
            component={ScreenJabatanCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenJabatanDetail"
            component={ScreenJabatanDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ScreenAbout" component={ScreenAbout} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" hidden={true} />
    </CONTEXT_APP.Provider>
  );
};

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
});
