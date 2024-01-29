import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 24,
		width: '100%',
	},
	reportTitle: {
		color: '#61dafb',
		letterSpacing: 4,
		fontSize: 25,
		textTransform: 'uppercase',
	},
});

const Title = ({ title }: { title: string }) => (
	<View style={styles.titleContainer}>
		<Text style={styles.reportTitle}>{title}</Text>
	</View>
);

export default Title;
