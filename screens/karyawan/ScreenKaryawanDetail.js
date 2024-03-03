import { StyleSheet, View } from "react-native";
import { Appbar, TextInput, Button } from "react-native-paper";
import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator";
import useMessage from "../../hooks/useMessage";
import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import { useEffect, useState } from "react";
import useValidator from "../../hooks/useValidator";
import { BASE_URL } from "../../settings";
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";

const ScreenKaryawanDetail = ({ navigation, route }) => {
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();

  const [karyawan, setKaryawan] = useState({
    nik: "",
    nama: "",
    alamat: "",
    no_Telepon: "",
    bank: "",
    no_rekening: "",
    departemen: {
      nama: "",
    },
  });

  const karyawanValidator = useValidator({
    nik: [],
    nama: [],
    alamat: [],
    no_Telepon: [],
    bank: [],
    no_rekening: [],
    departemen: [],
  });

  const handleChangeKaryawan = (text, field) => {
    setKaryawan({ ...karyawan, [field]: text });
  };

  const onKaryawanUpdate = async () => {
    try {
      karyawanValidator.reset();
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/karyawan/${route.params.id}`;
      http.privateHTTP
        .put(url, karyawan, config)
        .then((response) => {
          message.success(response);
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

  const onKaryawanDetail = async () => {
    try {
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/karyawan/${route.params.id}`;
      http.privateHTTP
        .get(url, config)
        .then((response) => {
          setKaryawan(response.data);
        })
        .catch((error) => {
          message.error(error);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onKaryawanDelete = () => {
    try {
      message.confirmRemove(async () => {
        const config = {
          headers: {
            Authorization: await jwt.get(),
          },
        };
        const url = `${BASE_URL}/karyawan/${route.params.id}`;
        http.privateHTTP
          .delete(url, config)
          .then((response) => {
            message.success(response);
            navigation.goBack();
          })
          .catch((error) => {
            message.error(error);
            console.log(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (route.params.id) {
      onKaryawanDetail();
    }
  }, [route.params]);

  return (
    <>
      <View>
        <WidgetCommonHeader
          back={<Appbar.BackAction onPress={navigation.goBack} />}
          title="Detail Karyawan"
        />

        <WidgetCommonAuth
          child={
            <View style={styles.container}>
              <View style={styles.wrapperControl}>
                <TextInput
                  label="NIK"
                  autoCapitalize="none"
                  value={karyawan.nik}
                  onChangeText={(text) => handleChangeKaryawan(text, "nik")}
                />
                <WidgetCommonValidator
                  messages={karyawanValidator.get("nik")}
                />
                <TextInput
                  label="Nama"
                  autoCapitalize="none"
                  value={karyawan.nama}
                  onChangeText={(text) => handleChangeKaryawan(text, "nama")}
                />
                <WidgetCommonValidator
                  messages={karyawanValidator.get("nama")}
                />
                <TextInput
                  label="Departemen"
                  autoCapitalize="none"
                  value={karyawan.departemen.nama}
                  onChangeText={(text) =>
                    handleChangeKaryawan(text, "departemen.nama")
                  }
                />
                <WidgetCommonValidator
                  messages={karyawanValidator.get("departemen.nama")}
                />
              </View>

              <View style={[styles.wrapperControl, styles.buttonActions]}>
                <Button onPress={onKaryawanDelete} mode="outlined">
                  Hapus
                </Button>
                <Button onPress={onKaryawanUpdate} mode="contained">
                  Simpan
                </Button>
              </View>
            </View>
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
  },
  buttonActions: {
    gap: 16,
  },
});

export default ScreenKaryawanDetail;
