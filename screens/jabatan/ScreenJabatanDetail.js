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

const ScreenJabatanDetail = ({ navigation, route }) => {
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();

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

  const handleChangeJabatan = (text, field) => {
    setJabatan({ ...jabatan, [field]: text });
  };

  const onJabatanUpdate = async () => {
    try {
      jabatanValidator.reset();
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/jabatan/${route.params.id}`;
      http.privateHTTP
        .put(url, jabatan, config)
        .then((response) => {
          message.success(response);
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

  const onJabatanDetail = async () => {
    try {
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/jabatan/${route.params.id}`;
      http.privateHTTP
        .get(url, config)
        .then((response) => {
          setJabatan(response.data);
        })
        .catch((error) => {
          message.error(error);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onJabatanDelete = () => {
    try {
      message.confirmRemove(async () => {
        const config = {
          headers: {
            Authorization: await jwt.get(),
          },
        };
        const url = `${BASE_URL}/jabatan/${route.params.id}`;
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
      onJabatanDetail();
    }
  }, [route.params]);

  return (
    <>
      <View>
        <WidgetCommonHeader
          back={<Appbar.BackAction onPress={navigation.goBack} />}
          title="Detail Jabatan"
        />

        <WidgetCommonAuth
          child={
            <View style={styles.container}>
              <View style={styles.wrapperControl}>
                <TextInput
                  label="Nama Jabatan"
                  autoCapitalize="none"
                  value={jabatan.nama}
                  onChangeText={(text) => handleChangeJabatan(text, "nama")}
                />
                <WidgetCommonValidator
                  messages={jabatanValidator.get("nama")}
                />
                <TextInput
                  label="Gaji Pokok"
                  autoCapitalize="none"
                  value={jabatan.gajiPokok}
                  onChangeNumber={(num) =>
                    handleChangeJabatan(num, "gajiPokok")
                  }
                />
                <WidgetCommonValidator
                  messages={jabatanValidator.get("gajiPokok")}
                />
                <TextInput
                  label="Tunjangan"
                  autoCapitalize="none"
                  value={jabatan.tunjangan}
                  onChangeNumber={(num) =>
                    handleChangeJabatan(num, "tunjangan")
                  }
                />
                <WidgetCommonValidator
                  messages={jabatanValidator.get("tunjangan")}
                />
              </View>
              <View style={[styles.wrapperControl, styles.buttonActions]}>
                <Button onPress={onJabatanDelete} mode="outlined">
                  Hapus
                </Button>
                <Button onPress={onJabatanUpdate} mode="contained">
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

export default ScreenJabatanDetail;
