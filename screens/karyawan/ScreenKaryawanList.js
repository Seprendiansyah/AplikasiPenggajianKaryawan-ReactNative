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

// TODO: infinite scroll
// TODO: tambahkan search pada list
const ScreenKaryawanList = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarKaryawan, setDaftarKaryawan] = useState([]);
  const [daftarKaryawanPagination, setDaftarKaryawanPagination] = useState({});
  const karyawanSearch = useRef({ value: "" });

  const onKaryawanList = async (params) => {
    const url = `${BASE_URL}/karyawan/`;
    const config = {
      headers: {
        Authorization: await jwt.get(),
      },
      params,
    };
    http.privateHTTP
      .get(url, config)
      .then((response) => {
        // console.log("uyee", BASE_URL)
        const { results, ...pagination } = response.data;

        setDaftarKaryawanPagination(pagination);
        setDaftarKaryawan(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onRefresh = () => {
    onKaryawanList();
    console.log("direfresh....");
  };

  useEffect(() => {
    if (isFocused) {
      onKaryawanList();
    }
  }, [isFocused]);

  // TODO: tambahankan infinite scroll
  return (
    <>
      <View>
        <WidgetCommonHeader
          back={<Appbar.BackAction onPress={navigation.goBack} />}
          title={"Karyawan"}
          action={
            <Appbar.Action
              icon="plus-circle-outline"
              onPress={() => {
                navigation.navigate("ScreenKaryawanCreate");
              }}
            />
          }
        />
        <Searchbar
          placeholder="Search"
          style={{ marginHorizontal: 16, marginVertical: 16 }}
          onChangeText={(text) => {
            const debounce = setTimeout(() => {
              onKaryawanList({ search: text });
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
              {daftarKaryawan.map((karyawan) => (
                <List.Item
                  onPress={() =>
                    navigation.navigate("ScreenKaryawanDetail", {
                      id: karyawan._id,
                    })
                  }
                  key={karyawan.id}
                  title={karyawan.nama}
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

export default ScreenKaryawanList;
