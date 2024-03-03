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

const ScreenPotonganList = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarPotongan, setDaftarPotongan] = useState([]);
  const [daftarPotonganPagination, setDaftarPotonganPagination] = useState({});
  const potonganSearch = useRef({ value: "" });

  const onPotonganList = async (params) => {
    const url = `${BASE_URL}/potongan/`;
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

        setDaftarPotonganPagination(pagination);
        setDaftarPotongan(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onRefresh = () => {
    onPotonganList();
    console.log("direfresh....");
  };

  useEffect(() => {
    if (isFocused) {
      onPotonganList();
    }
  }, [isFocused]);

  return (
    <>
      <View>
        <WidgetCommonHeader
          back={<Appbar.BackAction onPress={navigation.goBack} />}
          title={"Potongan"}
          action={
            <Appbar.Action
              icon="plus-circle-outline"
              onPress={() => {
                navigation.navigate("ScreenPotonganCreate");
              }}
            />
          }
        />
        <Searchbar
          placeholder="Search"
          style={{ marginHorizontal: 16, marginVertical: 16 }}
          onChangeText={(text) => {
            const debounce = setTimeout(() => {
              onPotonganList({ search: text });
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
              {daftarPotongan.map((potongan) => (
                <List.Item
                  onPress={() =>
                    navigation.navigate("ScreenPotonganDetail", {
                      id: potongan._id,
                    })
                  }
                  key={potongan.id}
                  title={potongan.nama}
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

export default ScreenPotonganList;
