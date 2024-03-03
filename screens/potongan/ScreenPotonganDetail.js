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

const ScreenPotonganDetail = ({ navigation, route }) => {
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();

  const [potongan, setPotongan] = useState({
    nama: "",
    potongan: 0,
  });

  const potonganValidator = useValidator({
    nama: [],
    potongan: [],
  });

  const handleChangePotongan = (text, field) => {
    setPotongan({ ...potongan, [field]: text });
  };

  const onPotonganUpdate = async () => {
    try {
      potonganValidator.reset();
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/potongan/${route.params.id}`;
      http.privateHTTP
        .put(url, potongan, config)
        .then((response) => {
          message.success(response);
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

  const onPotonganDetail = async () => {
    try {
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      };
      const url = `${BASE_URL}/potongan/${route.params.id}`;
      http.privateHTTP
        .get(url, config)
        .then((response) => {
          setPotongan(response.data);
        })
        .catch((error) => {
          message.error(error);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onPotonganDelete = () => {
    try {
      message.confirmRemove(async () => {
        const config = {
          headers: {
            Authorization: await jwt.get(),
          },
        };
        const url = `${BASE_URL}/potongan/${route.params.id}`;
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
      onPotonganDetail();
    }
  }, [route.params]);

  return (
    <>
      <View>
        <WidgetCommonHeader
          back={<Appbar.BackAction onPress={navigation.goBack} />}
          title="Detail Potongan"
        />

        <WidgetCommonAuth
          child={
            <View style={styles.container}>
              <View style={styles.wrapperControl}>
                <TextInput
                  label="Nama Potongan"
                  autoCapitalize="none"
                  value={potongan.nama}
                  onChangeText={(text) => handleChangePotongan(text, "nama")}
                />
                <WidgetCommonValidator
                  messages={potonganValidator.get("nama")}
                />
                <TextInput
                  label="Potongan"
                  autoCapitalize="none"
                  value={potongan.potongan}
                  onChangeNumber={(num) =>
                    handleChangePotongan(num, "potongan")
                  }
                />
                <WidgetCommonValidator
                  messages={potonganValidator.get("potongan")}
                />
              </View>
              <View style={[styles.wrapperControl, styles.buttonActions]}>
                <Button onPress={onPotonganDelete} mode="outlined">
                  Hapus
                </Button>
                <Button onPress={onPotonganUpdate} mode="contained">
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

export default ScreenPotonganDetail;
