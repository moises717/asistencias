'use client';
import { useEffect, useState } from 'react';
import { addDays, format } from 'date-fns';

import { type DateRange } from 'react-day-picker';

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
	nombre: string;
	apellido: string;
	numero_asistencias: 0;
}

const Asistencias = () => {
	const [asistencias, setAsistencia] = useState<Asistencia[]>([]);
	const currentDate = format(new Date(), 'yyyy-MM-dd');

	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(currentDate),
		to: addDays(new Date(currentDate), 1),
	});

	const dateRange = date?.from && date?.to ? `${format(date?.from, 'LL, dd, yyyy')} - ${format(date?.to, 'LL, dd, yyyy')}` : '';

	useEffect(() => {
		const getMiembros = async () => {
			if (!date?.from) return;
			if (!date?.to) return;
			const from = format(date?.from, 'yyyy-MM-dd');
			const to = format(date?.to, 'yyyy-MM-dd');

			/** filter: pb.filter(`created > {:from} && created < {:to}`, {
					from: `${from} 00:00:00.000Z`,
					to: `${to} 23:59:59.999Z`,
				}), */

			const data = await pb.send<Asistencia[]>('reporte-asistencias', {
				query: {
					from: `${from} 00:00:00.000Z`,
					to: `${to} 23:59:59.999Z`,
				},
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
			<div>
				<p>
					Asistencias <b>{asistencias.length}</b>
				</p>
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
					{asistencias.map(({ numero_asistencias, id, apellido, nombre }) => (
						<TableRow key={id}>
							<TableCell>
								<Avatar>
									<AvatarImage src='' alt={`${nombre} ${apellido}`} />
									<AvatarFallback>
										{nombre[0]}
										{apellido[0]}
									</AvatarFallback>
								</Avatar>
							</TableCell>
							<TableCell>{nombre}</TableCell>
							<TableCell>{apellido}</TableCell>
							<TableCell>{numero_asistencias}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Asistencias;
