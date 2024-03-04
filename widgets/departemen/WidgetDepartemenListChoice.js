
import { IconButton, List, Text, DataTable, Button } from 'react-native-paper';


const WidgetDepartemenListChoice = ({callback, daftarDepartemen=[]}) => {
  return (
    <>
      <List.Subheader>Departemen Terpilih</List.Subheader>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Departemen</DataTable.Title>
          <DataTable.Title>#</DataTable.Title>
        </DataTable.Header>

        {daftarDepartemen.map((item) => (
          <DataTable.Row key={item._id}>
            <DataTable.Cell>{JSON.stringify(daftarDepartemen)}</DataTable.Cell>

            <DataTable.Cell>{item.nama}</DataTable.Cell>
            <DataTable.Cell>
              <Button onPress={() => { callback(item) }}>Hapus</Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </>
  )
}

export default WidgetDepartemenListChoice;
