'use client';
import React from 'react';
import { Page, Document, StyleSheet, View, Text } from '@react-pdf/renderer';
import { Asistencia } from '@/app/inicio/asistencia/page';
import Title from './title';
import Items from './tableItems';

// Create styles
const styles = StyleSheet.create({
	page: {
		fontFamily: 'Helvetica',
		fontSize: 11,
		paddingTop: 30,
		paddingLeft: 60,
		paddingRight: 60,
		lineHeight: 1.5,
		flexDirection: 'column',
	},
});

export const Pdf = ({ data, dataRange }: { data: Asistencia[]; dataRange: string }) => {
	return (
		<Document>
			<Page size='LETTER' style={styles.page}>
				<Title title='Reporte de asistencias' />
				<View style={{ textAlign: 'center' }}>
					<Text>Del {dataRange}</Text>
				</View>
				<View style={{ textAlign: 'center' }}>
					<Text>Asistencias: {data.length}</Text>
				</View>
				<Items items={data} />
			</Page>
		</Document>
	);
};
