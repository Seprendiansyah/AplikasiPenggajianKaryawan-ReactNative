import { StyleSheet, View } from "react-native";
import { Appbar, TextInput, Button, List, Text } from "react-native-paper";
import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator";
import useMessage from "../../hooks/useMessage";
import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import { useState, useEffect, isFocused } from "react";
import useValidator from "../../hooks/useValidator";
import useChangeListener from "../../hooks/useChangeListener";
import { BASE_URL } from "../../settings";
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";
import { ScrollView } from "react-native-gesture-handler";
import WidgetJabatanChoice from "../../widgets/jabatan/WidgetJabatanChoice";
import WidgetDepartemenListChoice from "../../widgets/departemen/WidgetDepartemenListChoice";

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

  const [absensi, setAbsensi] = useState({
    Hadir: 0,
    Alpa: 0,
    Terlambat: 0,
  });

  const [departemen, setDepartemen] = useState({
    nama: "",
  });

  const [potongans, daftarPotongans] = useState([]);

  //daftar Jabatan
  const [daftarJabatan, setDaftarJabatan] = useState([]);
  const [daftarDepartemen, setDaftarDepartemen] = useState([]);

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
        jabatan,
        absensi
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
  //Jabatan List
  const onJabatanList = async (params) => {
    try {
      params = { ...params, limit: 4 }
      const url = `${BASE_URL}/jabatan/`;
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
        params
      }
      http.privateHTTP.get(url, config).then((response) => {
        const { results, ...pagination } = response.data;
        setDaftarJabatan(results)
      }).catch((error) => {
        console.log(error)
        message.error(error);
      })
    } catch (error) {
      console.log(error)
    }
  }
  const callbackWidgetJabatanChoice = (item) => {
    if (!array.isDuplicated(daftarJabatan, item, '_id')) {
      setDaftarJabatan([...daftarJabatan, item])
    }
  }

  const callbackWidgetDepartemenListChoice = (item) => {
    array.removeItem(daftarDepartemen, item, '_id', setDaftarDepartemen)
  }

  useEffect(() => {

    if (isFocused) {
      onJabatanList()
    }

  }, [isFocused]);



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
              <Text>{JSON.stringify(daftarJabatan)}</Text>
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
                    label="Hadir"
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
                  <Text>Absensi</Text>
                  <TextInput
                    label="Hadir"
                    autoCapitalize="none"
                    value={absensi.Hadir}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "Hadir",
                        text,
                        absensi,
                        setAbsensi
                      )
                    }
                  />
                  <TextInput
                    label="Terlambat"
                    autoCapitalize="none"
                    value={absensi.Terlambat}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "Terlambat",
                        text,
                        absensi,
                        setAbsensi
                      )
                    }
                  />
                  <TextInput
                    label="Alpa"
                    autoCapitalize="none"
                    value={absensi.Alpa}
                    onChangeText={(text) =>
                      changeListener.onChangeText(
                        "Alpa",
                        text,
                        absensi,
                        setAbsensi
                      )
                    }
                  />
                </View>
                <Text>Jabatan</Text>
                <WidgetJabatanChoice
                  daftarJabatan={daftarJabatan}
                  callback={callbackWidgetJabatanChoice}
                />
                <Text>Departemen</Text>
                <WidgetDepartemenListChoice
                  callback={callbackWidgetDepartemenListChoice}
                  daftarJabatan={daftarJabatan} />
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
