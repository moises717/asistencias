import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc';
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderBottomColor: '#bff0fd',
		backgroundColor: '#bff0fd',
		borderBottomWidth: 1,
		alignItems: 'center',
		height: 24,
		textAlign: 'center',
		fontStyle: 'bold',
		flexGrow: 1,
	},
	nombre: {
		width: '40%',
		borderRightColor: borderColor,
		borderRightWidth: 1,
	},
	apellido: {
		width: '40%',
		borderRightColor: borderColor,
		borderRightWidth: 1,
	},
	asistencias: {
		width: '20%',
		borderRightColor: borderColor,
		borderRightWidth: 1,
	},
});

const InvoiceTableHeader = () => (
	<View style={styles.container}>
		<Text style={styles.nombre}>Nombre</Text>
		<Text style={styles.apellido}>Apellido</Text>
		<Text style={styles.asistencias}>Asistencias</Text>
	</View>
);

export default InvoiceTableHeader;
