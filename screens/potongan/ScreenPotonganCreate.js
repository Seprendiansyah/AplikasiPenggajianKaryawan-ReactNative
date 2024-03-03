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

const ScreenPotonganCreate = ({ navigation }) => {
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [potongan, setPotongan] = useState({
    nama: "",
    potongan: 0,
  });

  const potonganValidator = useValidator({
    nama: [],
    potongan: [],
  });

  const onPotonganCreate = async () => {
    try {
      potonganValidator.reset();
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/potongan/`;
      const payload = {
        ...potongan,
      };
      http.privateHTTP
        .post(url, payload, config)
        .then((response) => {
          message.success(config);
          navigation.goBack();
        })
        .catch((error) => {
          message.error(error);
          potonganValidator.except(error);
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
          title={"Tambah Potongan"}
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
                    value={potongan.nama}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "nama",
                        text,
                        potongan,
                        setPotongan
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={potonganValidator.get("nama")}
                  />
                  <TextInput
                    label="Potongan"
                    autoCapitalize="none"
                    value={potongan.potongan}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "potongan",
                        text,
                        potongan,
                        setPotongan
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={potonganValidator.get("potongan")}
                  />
                </View>
                <View style={styles.wrapperControl}>
                  <Button onPress={onPotonganCreate} mode="contained">
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

export default ScreenPotonganCreate;
