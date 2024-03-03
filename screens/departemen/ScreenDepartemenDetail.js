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

const ScreenDepartemenDetail = ({ navigation, route }) => {
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();

  const [departemen, setDepartemen] = useState({
    nama: "",
  });

  const departemenValidator = useValidator({
    nama: [],
  });

  const handleChangeDepartemen = (text, field) => {
    setDepartemen({ ...departemen, [field]: text });
  };

  const onDepartemenUpdate = async () => {
    try {
      departemenValidator.reset();
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/departemen/${route.params.id}`;
      http.privateHTTP
        .put(url, departemen, config)
        .then((response) => {
          message.success(response);
          navigation.goBack();
        })
        .catch((error) => {
          message.error(error);
          departemenValidator.except(error);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onDepartemenDetail = async () => {
    try {
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/departemen/${route.params.id}`;
      http.privateHTTP
        .get(url, config)
        .then((response) => {
          setDepartemen(response.data);
        })
        .catch((error) => {
          message.error(error);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onDepartemenDelete = () => {
    try {
      message.confirmRemove(async () => {
        const config = {
          headers: {
            Authorization: await jwt.get(),
          },
        };
        const url = `${BASE_URL}/departemen/${route.params.id}`;
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
      onDepartemenDetail();
    }
  }, [route.params]);

  return (
    <>
      <View>
        <WidgetCommonHeader
          back={<Appbar.BackAction onPress={navigation.goBack} />}
          title="Detail Departemen"
        />

        <WidgetCommonAuth
          child={
            <View style={styles.container}>
              <View style={styles.wrapperControl}>
                <TextInput
                  label="Nama Departemen"
                  autoCapitalize="none"
                  value={departemen.nama}
                  onChangeText={(text) => handleChangeDepartemen(text, "nama")}
                />
                <WidgetCommonValidator
                  messages={departemenValidator.get("nama")}
                />
              </View>
              <View style={[styles.wrapperControl, styles.buttonActions]}>
                <Button onPress={onDepartemenDelete} mode="outlined">
                  Hapus
                </Button>
                <Button onPress={onDepartemenUpdate} mode="contained">
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

export default ScreenDepartemenDetail;
