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

const ScreenJabatanCreate = ({ navigation }) => {
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [jabatan, setJabatan] = useState({
    nama: "",
    gajiPokok: 0,
    tunjangan: 0,
  });

  const jabatanValidator = useValidator({
    nama: [],
    gajiPokok: [],
    tunjangan: [],
  });

  const onJabatanCreate = async () => {
    try {
      jabatanValidator.reset();
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/jabatan/`;
      const payload = {
        ...jabatan,
      };
      http.privateHTTP
        .post(url, payload, config)
        .then((response) => {
          message.success(config);
          navigation.goBack();
        })
        .catch((error) => {
          message.error(error);
          jabatanValidator.except(error);
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
          title={"Tambah Jabatan"}
        />
        <WidgetCommonAuth
          child={
            <>
              <ScrollView style={styles.container}>
                <View style={styles.wrapperControl}>
                  <TextInput
                    style={styles.TextInput}
                    label="Nama Jabatan"
                    autoCapitalize="none"
                    value={jabatan.nama}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "nama",
                        text,
                        jabatan,
                        setJabatan
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={jabatanValidator.get("nama")}
                  />
                  <TextInput
                    style={styles.TextInput}
                    label="Gaji Pokok"
                    autoCapitalize="none"
                    value={jabatan.gajiPokok}
                    onChangeNumber={(num) =>
                      changeListener.onChangeNumber(
                        "gajiPokok",
                        num,
                        jabatan,
                        setJabatan
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={jabatanValidator.get("gajiPokok")}
                  />
                  <TextInput
                    style={styles.TextInput}
                    label="Tunjangan"
                    autoCapitalize="none"
                    value={jabatan.tunjangan}
                    onChangeNumber={(num) =>
                      changeListener.onChangeNumber(
                        "tunjangan",
                        num,
                        tunjangan,
                        setJabatan
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={jabatanValidator.get("tunjangan")}
                  />
                </View>
                <View style={styles.wrapperControl}>
                  <Button onPress={onJabatanCreate} mode="contained">
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

export default ScreenJabatanCreate;
