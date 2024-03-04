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

const ScreenPenggajianList = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarPenggajian, setDaftarPenggajian] = useState([]);
  const [daftarPenggajianPagination, setDaftarPenggajianPagination] = useState({});
  const penggajianSearch = useRef({ value: "" });

  const onPenggajianList = async (params) => {
    const url = `${BASE_URL}/penggajian/`;
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

        setDaftarPenggajianPagination(pagination);
        setDaftarPenggajian(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onRefresh = () => {
    onPenggajianList();
    console.log("direfresh....");
  };

  useEffect(() => {
    if (isFocused) {
      onPenggajianList();
    }
  }, [isFocused]);

  return (
    <>
      <View>
        <WidgetCommonHeader
          back={<Appbar.BackAction onPress={navigation.goBack} />}
          title={"Penggajian"}
          action={
            <Appbar.Action
              icon="plus-circle-outline"
              onPress={() => {
                navigation.navigate("ScreenPenggajianCreate");
              }}
            />
          }
        />
        <Searchbar
          placeholder="Search"
          style={{ marginHorizontal: 16, marginVertical: 16 }}
          onChangeText={(text) => {
            const debounce = setTimeout(() => {
              onPenggajianList({ search: text });
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
              {daftarPenggajian.map((value) => (
                <List.Item
                  onPress={() =>
                    navigation.navigate("ScreenPenggajianPrint", {
                      value
                    })
                  }
                  key={value.id}
                  title={value.karyawanref.nama}
                  left={(props) => (
                    <List.Icon {...props} icon="account-circle"  />
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

export default ScreenPenggajianList;
