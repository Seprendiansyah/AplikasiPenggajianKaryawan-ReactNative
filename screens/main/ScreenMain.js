import { StyleSheet, View } from "react-native";
import { List, MD3Colors } from "react-native-paper";
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";

const ScreenMain = ({ navigation }) => {
  return (
    <>
      <WidgetCommonHeader title={"Main"} />
      <WidgetCommonAuth
        child={
          <View style={styles.container}>
            <List.Section>
              <List.Subheader>Master</List.Subheader>
              <List.Item
                title="Karyawan"
                left={() => <List.Icon icon="folder" />}
                onPress={() => navigation.navigate("ScreenKaryawanList")}
              />
              <List.Item
                title="Potongan"
                left={() => <List.Icon icon="folder" />}
                onPress={() => navigation.navigate("ScreenPotonganList")}
              />
              <List.Item
                title="Jabatan"
                left={() => <List.Icon icon="folder" />}
                onPress={() => navigation.navigate("ScreenJabatanList")}
              />
              <List.Item
                title="Departemen"
                onPress={() => navigation.navigate("ScreenDepartemenList")}
                left={() => <List.Icon icon="folder" />}
              />
            </List.Section>
            <List.Section>
              <List.Subheader>Penggajian</List.Subheader>
              <List.Item
                title="Penggajian"
                onPress={() => navigation.navigate("ScreenPenggajianList")}
                left={() => (
                  <List.Icon color={MD3Colors.tertiary70} icon="folder" />
                )}
              />
            </List.Section>
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
});

export default ScreenMain;
