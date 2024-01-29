import { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { type Asistencia } from '../../app/inicio/asistencia/page';

const borderColor = '#90e5fc';
const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		borderBottomColor: '#bff0fd',
		borderBottomWidth: 1,
		alignItems: 'center',
		height: 24,
		fontStyle: 'bold',
	},
	nombre: {
		width: '40%',
		textAlign: 'left',
		borderRightColor: borderColor,
		borderRightWidth: 1,
		paddingLeft: 8,
	},
	apellido: {
		width: '40%',
		borderRightColor: borderColor,
		borderRightWidth: 1,
		textAlign: 'right',
		paddingRight: 8,
	},
	asistencias: {
		width: '20%',
		borderRightColor: borderColor,
		borderRightWidth: 1,
		textAlign: 'right',
		paddingRight: 8,
	},
});

const InvoiceTableRow = ({ items }: { items: Asistencia[] }) => {
	const rows = items.map(item => (
		<View style={styles.row} key={item.id}>
			<Text style={styles.nombre}>{item.expand.miembro.nombre}</Text>
			<Text style={styles.apellido}>{item.expand.miembro.nombre}</Text>
			<Text style={styles.asistencias}>{item.numero_asistencias}</Text>
		</View>
	));
	return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
