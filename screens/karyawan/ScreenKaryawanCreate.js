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

const ScreenKaryawanCreate = ({ navigation }) => {
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [karyawan, setKaryawan] = useState({
    nik: "",
    nama: "",
    alamat: "",
    no_Telepon: "",
    bank: "",
    no_rekening: "",
  });

  const [jabatan, setJabatan] = useState({
    nama: "",
    gajiPokok: 0,
    tunjangan: 0,
  });

  const [departemen, setDepartemen] = useState({
    nama: "",
  });

  const karyawanValidator = useValidator({
    nik: [],
    nama: [],
    alamat: [],
    no_Telepon: [],
    bank: [],
    no_rekening: [],
  });

  const onKaryawanCreate = async () => {
    try {
      karyawanValidator.reset();
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/karyawan/`;
      const payload = {
        ...karyawan,
      };
      http.privateHTTP
        .post(url, payload, config)
        .then((response) => {
          message.success(config);
          navigation.goBack();
        })
        .catch((error) => {
          message.error(error);
          karyawanValidator.except(error);
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
          title={"Tambah Karyawan"}
        />
        <WidgetCommonAuth
          child={
            <>
              {/* <Text>{JSON.stringify(karyawanValidator.result())}</Text> */}
              <ScrollView style={styles.container}>
                <View style={styles.wrapperControl}>
                  <TextInput
                    style={styles.TextInput}
                    label="NIK"
                    autoCapitalize="none"
                    value={karyawan.nik}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "nik",
                        text,
                        karyawan,
                        setKaryawan
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={karyawanValidator.get("nik")}
                  />
                  <TextInput
                    label="Nama"
                    autoCapitalize="none"
                    value={karyawan.nama}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "nama",
                        text,
                        karyawan,
                        setKaryawan
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={karyawanValidator.get("nama")}
                  />
                  <TextInput
                    label="No. Telepon"
                    autoCapitalize="none"
                    value={karyawan.no_Telepon}
                    onChangeText={(text) =>
                      changeListener.onChangeNumber(
                        "no_Telepon",
                        text,
                        karyawan,
                        setKaryawan
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={karyawanValidator.get("no_Telepon")}
                  />
                  <TextInput
                    as={"textarea"}
                    label="Alamat"
                    autoCapitalize="none"
                    value={karyawan.alamat}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "alamat",
                        text,
                        karyawan,
                        setKaryawan
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={karyawanValidator.get("alamat")}
                  />
                  <TextInput
                    label="Bank"
                    autoCapitalize="none"
                    value={karyawan.bank}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "bank",
                        text,
                        karyawan,
                        setKaryawan
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={karyawanValidator.get("bank")}
                  />
                  <TextInput
                    label="No.Rekening"
                    autoCapitalize="none"
                    value={karyawan.no_rekening}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "no_rekening",
                        text,
                        karyawan,
                        setKaryawan
                      )
                    }
                  />
                  <WidgetCommonValidator
                    messages={karyawanValidator.get("no_rekening")}
                  />
                </View>
                <View style={styles.wrapperControl}>
                  <Button onPress={onKaryawanCreate} mode="contained">
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

export default ScreenKaryawanCreate;
