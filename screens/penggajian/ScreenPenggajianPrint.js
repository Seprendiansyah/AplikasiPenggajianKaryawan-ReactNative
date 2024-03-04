import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Table } from 'react-bootstrap';

const ScreenPenggajianPrint = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { value } = route.params;

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  const Bulan = (bulan) => {
    switch (bulan) {
      case 1:
        return "Januari";
      case 2:
        return "Februari";
      case 3:
        return "Maret";
      case 4:
        return "April";
      case 5:
        return "Mei";
      case 6:
        return "Juni";
      case 7:
        return "Juli";
      case 8:
        return "Agustus";
      case 9:
        return "September";
      case 10:
        return "Oktober";
      case 11:
        return "November";
      case 12:
        return "Desember";
      default:
        return "Bulan tidak valid";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PT Teknologi Canggih Indonesia</Text>
      <Text style={styles.subHeader}>Inovasi Digital Nusantara</Text>
      <Text style={styles.subHeader}>Slip Gaji Karyawan</Text>
      <Text style={styles.period}>Periode bulan: {Bulan(value.periodeGajiBulan)}</Text>

      {/* Profile */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Profil Karyawan</Text>
        <View style={styles.row}>
          <Text style={styles.label}>NIK:</Text>
          <Text style={styles.value}>{value.karyawanref.nik}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nama:</Text>
          <Text style={styles.value}>{value.karyawanref.nama}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Alamat:</Text>
          <Text style={styles.value}>{value.karyawanref.alamat}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>No Telepon:</Text>
          <Text style={styles.value}>{value.karyawanref.no_Telepon}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Departemen:</Text>
          <Text style={styles.value}>{value.karyawanref.departemen.nama}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Bank:</Text>
          <Text style={styles.value}>{value.karyawanref.bank}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>No Rekening:</Text>
          <Text style={styles.value}>{value.karyawanref.no_rekening}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Jabatan:</Text>
          <Text style={styles.value}>{value.karyawanref.jabatan.nama}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gaji Pokok:</Text>
          <Text style={styles.value}>{formatCurrency(value.karyawanref.jabatan.gajiPokok)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tunjangan:</Text>
          <Text style={styles.value}>{formatCurrency(value.karyawanref.jabatan.tunjangan)}</Text>
        </View>
      </View>
      {/* <Text>{value.karyawanref.nama}</Text> */}

      {/* Potongan */}
      {/* Continue with other sections */}



      {/* Total Potongan */}
      <View style={styles.section}>
        <Text style={styles.totalLabel}>Total Potongan</Text>
        <Text style={styles.totalValue}>{formatCurrency(value.totalPotongan)}</Text>
      </View>
      {/* Total Gaji Bersih */}
      {/* Continue with total gaji section */}
      <View style={styles.section}>
        <Text style={styles.totalLabel}>Total Gaji Bersih</Text>
        <Text style={styles.totalValue}>{formatCurrency(value.totalGaji)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.navigate("ScreenPenggajianList")} />
        <Button title="Print" onPress={handlePrint} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Menerapkan space-end
    marginBottom: 10,
  },
  container: {
    margin:20,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  period: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'green', // warna label total gaji
    textAlign: 'center',
  },
  totalValue: {
    fontSize: 18,
    textAlign: 'center',
    color: 'green', // warna nilai total gaji
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default ScreenPenggajianPrint;
