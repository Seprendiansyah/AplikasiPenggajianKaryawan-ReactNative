import { StyleSheet, View } from "react-native";
import { Appbar, TextInput, Button, List, Text } from "react-native-paper";
import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator";
import useMessage from "../../hooks/useMessage";
import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import { useState } from "react";
import useValidator from "../../hooks/useValidator";
import useChangeListener from "../../hooks/useChangeListener";
import { BASE_URL } from "../../settings";
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";
import { ScrollView } from "react-native-gesture-handler";

const ScreenPenggajianCreate = ({ navigation }) => {
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [penggajian, setPenggajian] = useState({
    nama: "",
    penggajian: 0,
  });

  const penggajianValidator = useValidator({
    nama: [],
    penggajian: [],
  });

  const onPenggajianCreate = async () => {
    try {
      penggajianValidator.reset();
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/penggajian/`;
      const payload = {
        ...penggajian,
      };
      http.privateHTTP
        .post(url, payload, config)
        .then((response) => {
          message.success(config);
          navigation.goBack();
        })
        .catch((error) => {
          message.error(error);
          penggajianValidator.except(error);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View>
        <WidgetCommonHeader
          back={<Appbar.BackAction onPress={navigation.goBack} />}
          title={"Tambah Penggajian"}
        />
        <WidgetCommonAuth
          child={
            <>
              <ScrollView style={styles.container}>
                <View style={styles.wrapperControl}>
                  <TextInput
                    style={styles.TextInput}
                    label="nama"
                    autoCapitalize="none"
                    value={penggajian.nama}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "nama",
                        text,
                        penggajian,
                        setPenggajian
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={penggajianValidator.get("nama")}
                  />
                  <TextInput
                    label="Penggajian"
                    autoCapitalize="none"
                    value={penggajian.penggajian}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "penggajian",
                        text,
                        penggajian,
                        setPenggajian
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={penggajianValidator.get("penggajian")}
                  />
                </View>
                <View style={styles.wrapperControl}>
                  <Button onPress={onPenggajianCreate} mode="contained">
                    Simpan
                  </Button>
                </View>
              </ScrollView>
            </>
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "100%",
    gap: 32,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  wrapperControl: {
    width: "100%",
    gap: 8,
  },
});

export default ScreenPenggajianCreate;
