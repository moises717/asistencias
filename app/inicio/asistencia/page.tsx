'use client';
import { useEffect, useState } from 'react';
import { addDays, format } from 'date-fns';

import { type DateRange } from 'react-day-picker';

import { type Miembro } from '@/app/inicio/page';
import { pb } from '@/lib/pb';

import { DatePickerWithRange } from '@/components/DatePicker';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IconFile } from '@/components/icons';
import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

import { Pdf } from '@/components/pdf';

export interface Asistencia {
	id: string;
	miembro: string;
	presente: boolean;
	numero_asistencias: number;
	fecha: string;
	expand: {
		miembro: Miembro;
	};
}

const Asistencias = () => {
	const [asistencias, setAsistencia] = useState<Asistencia[]>([]);
	const currentDate = format(new Date(), 'LL, dd, yyyy');
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(currentDate),
		to: addDays(new Date(currentDate), 1),
	});

	const dateRange = date?.from && date?.to ? `${format(date?.from, 'LL, dd, yyyy')} - ${format(date?.to, 'LL, dd, yyyy')}` : '';

	useEffect(() => {
		const getMiembros = async () => {
			if (!date?.from) return;
			if (!date?.to) return;

			let beginTime = new Date(date?.from?.toString());
			beginTime.setHours(0, 0, 0, 0);
			let startTimeString: string = beginTime.toISOString().replace('T', ' ');

			let endTime = new Date(date?.to?.toString());
			endTime.setHours(23, 59, 59, 999);
			let endTimeString: string = endTime.toISOString().replace('T', ' ');

			const data = await pb.collection<Asistencia>('asistencias_miembros').getFullList({
				expand: 'miembro',
				filter: pb.filter(`created > {:from} && created < {:to}`, {
					from: startTimeString,
					to: endTimeString,
				}),
			});
			setAsistencia(data);
		};

		getMiembros();
	}, [date]);

	return (
		<div>
			<div className='flex pb-2 gap-3 mt-3 flex-col items-end sm:flex-row'>
				<DatePickerWithRange onChange={setDate} className='w-full' />
				<PDFDownloadLink document={<Pdf data={asistencias} dataRange={dateRange} />} fileName={`asistencias-${currentDate}`}>
					{({ loading }) =>
						loading ? (
							<Button variant='success' className='flex justify-between gap-1'>
								Generando..
							</Button>
						) : (
							<Button variant='success' className='flex justify-between gap-1'>
								Exportar <IconFile className='w-4 h-4 fill-white' />
							</Button>
						)
					}
				</PDFDownloadLink>
			</div>

			<Table className='border w-full mt-6'>
				<TableCaption>Lista de miembros.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Imagen</TableHead>
						<TableHead>Nombre</TableHead>
						<TableHead>Apellido</TableHead>
						<TableHead align='right'>Asistencias</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{asistencias.map(({ expand: { miembro }, numero_asistencias }) => (
						<TableRow key={miembro.nombre}>
							<TableCell>
								<Avatar>
									<AvatarImage src='' alt={`${miembro.nombre} ${miembro.apellido}`} />
									<AvatarFallback>
										{miembro.nombre[0]}
										{miembro.apellido[0]}
									</AvatarFallback>
								</Avatar>
							</TableCell>
							<TableCell>{miembro.nombre}</TableCell>
							<TableCell>{miembro.apellido}</TableCell>
							<TableCell>{numero_asistencias}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Asistencias;
