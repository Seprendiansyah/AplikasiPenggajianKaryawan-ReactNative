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

const ScreenJabatanList = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarJabatan, setDaftarJabatan] = useState([]);
  const [daftarJabatanPagination, setDaftarJabatanPagination] = useState({});
  const jabatanSearch = useRef({ value: "" });

  const onJabatanList = async (params) => {
    const url = `${BASE_URL}/jabatan/`;
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

        setDaftarJabatanPagination(pagination);
        setDaftarJabatan(results);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onRefresh = () => {
    onJabatanList();
    console.log("direfresh....");
  };

  useEffect(() => {
    if (isFocused) {
      onJabatanList();
    }
  }, [isFocused]);

  return (
    <>
      <View>
        <WidgetCommonHeader
          back={<Appbar.BackAction onPress={navigation.goBack} />}
          title={"Jabatan"}
          action={
            <Appbar.Action
              icon="plus-circle-outline"
              onPress={() => {
                navigation.navigate("ScreenJabatanCreate");
              }}
            />
          }
        />
        <Searchbar
          placeholder="Search"
          style={{ marginHorizontal: 16, marginVertical: 16 }}
          onChangeText={(text) => {
            const debounce = setTimeout(() => {
              onJabatanList({ search: text });
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
              {daftarJabatan.map((jabatan) => (
                <List.Item
                  onPress={() =>
                    navigation.navigate("ScreenJabatanDetail", {
                      id: jabatan._id,
                    })
                  }
                  key={jabatan.id}
                  title={jabatan.nama}
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

export default ScreenJabatanList;
