import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './header';
import InvoiceTableRow from './row';
import { type Asistencia } from '../../app/inicio/asistencia/page';

const styles = StyleSheet.create({
	tableContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 24,
		borderWidth: 1,
		borderColor: '#bff0fd',
	},
});

const Items = ({ items }: { items: Asistencia[] }) => (
	<View style={styles.tableContainer}>
		<InvoiceTableHeader />
		<InvoiceTableRow items={items} />
	</View>
);

export default Items;
