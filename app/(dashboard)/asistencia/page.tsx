'use client';
import { useEffect, useState } from 'react';

import { DatePickerWithRange } from '@/components/DatePicker';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { pb } from '@/lib/pb';
import { type Miembro } from '../miembros/page';

export interface Asistencia {
	id: string;
	miembro: string;
	presente: boolean;
	fecha: string;
	expand: {
		miembro: Miembro;
	};
}

const Asistencias = () => {
	const [asistencias, setAsistencia] = useState<Asistencia[]>([]);

	useEffect(() => {
		const getMiembros = async () => {
			const data = await pb.collection<Asistencia>('asistencias').getFullList({
				expand: 'miembro',
			});
			setAsistencia(data);
		};

		getMiembros();
	}, []);
	return (
		<div>
			<DatePickerWithRange />

			<Table className='border w-full '>
				<TableCaption>Lista de miembros.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Imagen</TableHead>
						<TableHead>Nombre</TableHead>
						<TableHead>Apellido</TableHead>
						<TableHead align='right'>Fecha</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{asistencias.map(({ expand: { miembro } }) => (
						<TableRow key={miembro.nombre}>
							<TableCell>
								<Avatar>
									<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</TableCell>
							<TableCell>{miembro.nombre}</TableCell>
							<TableCell>{miembro.apellido}</TableCell>
							<TableCell>{miembro.created}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total Presentes</TableCell>
						<TableCell>96</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
};

export default Asistencias;
