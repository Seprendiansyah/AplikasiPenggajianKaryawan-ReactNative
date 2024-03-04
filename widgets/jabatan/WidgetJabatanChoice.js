import { useState, useEffect } from "react"
import { ScrollView, StyleSheet, View } from "react-native";
import { Modal, Portal, List, Text, Button, PaperProvider } from 'react-native-paper';
import { DataTable } from 'react-native-paper';

const WidgetJabatanChoice = ({ callback, daftarJabatan=[]}) => {

  return (
    <>
      <List.Subheader>Pilih Jabatan</List.Subheader>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nama Jabatan</DataTable.Title>
          <DataTable.Title>#</DataTable.Title>
        </DataTable.Header>

        {daftarJabatan.map((item) => (
          <DataTable.Row key={item._id}>
            <DataTable.Cell>{item.nama}</DataTable.Cell>
            <DataTable.Cell>
              <Button onPress={() => {
                callback(item)
              }}>Pilih</Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: 'white', 
    padding: 20,
    flexGrow: 1,
    marginHorizontal: 0,
    gap: 8,
    paddingVertical: 0,
  }
})
export default WidgetJabatanChoice;