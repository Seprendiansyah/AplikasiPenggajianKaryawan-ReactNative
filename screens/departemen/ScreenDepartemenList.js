import { useCallback, useEffect, useRef, useState } from "react";
import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import { List, Searchbar } from "react-native-paper";
import useMessage from "../../hooks/useMessage";
import { BASE_URL } from "../../settings";
import { Appbar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";

const ScreenDepartemenList = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarDepartemen, setDaftarDepartemen] = useState([]);
  const [daftarDepartemenPagination, setDaftarDepartemenPagination] = useState(
    {}
  );
  const departemenSearch = useRef({ value: "" });

  const onDepartemenList = async (params) => {
    const url = `${BASE_URL}/departemen/`;
    const config = {
      headers: {
        Authorization: await jwt.get(),
      },
      params,
    };
    http.privateHTTP
      .get(url, config)
      .then((response) => {
        const { results, ...pagination } = response.data;

        setDaftarDepartemenPagination(pagination);
        setDaftarDepartemen(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onRefresh = () => {
    onDepartemenList();
    console.log("direfresh....");
  };

  useEffect(() => {
    if (isFocused) {
      onDepartemenList();
    }
  }, [isFocused]);

  return (
    <>
      <View>
        <WidgetCommonHeader
          back={<Appbar.BackAction onPress={navigation.goBack} />}
          title={"Departemen"}
          action={
            <Appbar.Action
              icon="plus-circle-outline"
              onPress={() => {
                navigation.navigate("ScreenDepartemenCreate");
              }}
            />
          }
        />
        <Searchbar
          placeholder="Search"
          style={{ marginHorizontal: 16, marginVertical: 16 }}
          onChangeText={(text) => {
            const debounce = setTimeout(() => {
              onDepartemenList({ search: text });
              clearTimeout(debounce);
            }, 1000);
          }}
        />
        <WidgetCommonAuth
          child={
            <ScrollView
              style={{ width: "100%" }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {daftarDepartemen.map((departemen) => (
                <List.Item
                  onPress={() =>
                    navigation.navigate("ScreenDepartemenDetail", {
                      id: departemen._id,
                    })
                  }
                  key={departemen.id}
                  title={departemen.nama}
                  left={(props) => (
                    <List.Icon {...props} icon="folder-outline" />
                  )}
                />
              ))}
            </ScrollView>
          }
        />
      </View>
    </>
  );
};

export default ScreenDepartemenList;
