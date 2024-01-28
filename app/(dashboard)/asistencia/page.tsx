'use client';
import { useEffect, useState } from 'react';
import { addDays, format } from 'date-fns';
import { TemplateHandler } from 'easy-template-x';

import { type DateRange } from 'react-day-picker';
import { type Miembro } from '@/app/(dashboard)/miembros/page';

import { pb } from '@/lib/pb';

import { DatePickerWithRange } from '@/components/DatePicker';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IconExcel } from '@/components/icons';

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
	const currentDate = format(new Date(), 'L, d, y');
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(currentDate),
		to: addDays(new Date(currentDate), 1),
	});

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

	const exportar = async () => {
		const data = {
			Asistentes: [
				...asistencias.map(({ expand: { miembro }, numero_asistencias }) => ({
					nombre: miembro.nombre,
					apellido: miembro.apellido,
					asistencias: numero_asistencias,
				})),
			],
			inicio: format(date?.from || new Date(), 'LL, dd, yyy'),
			fin: format(date?.to || new Date(), 'LL, dd, yyyy'),
		};

		const response = await fetch('/asistencia-template.docx');
		const templateFile = await response.blob();

		const handler = new TemplateHandler();
		const doc = await handler.process(templateFile, data);

		saveFile(`asistencia-${currentDate}.docx`, doc);
	};

	function saveFile(filename: string, blob: Blob) {
		const blobUrl = URL.createObjectURL(blob);
		let link = document.createElement('a') as HTMLAnchorElement | null;
		if (link === null) return;
		link.download = filename;
		link.href = blobUrl;
		document.body.appendChild(link);
		link.click();
		setTimeout(() => {
			if (link === null) return;
			link.remove();
			window.URL.revokeObjectURL(blobUrl);
			link = null;
		}, 0);
	}

	return (
		<div>
			<div className='py-3 flex'>
				<DatePickerWithRange onChange={setDate} className='w-full' />
				<Button className='ml-2 flex justify-between gap-1' onClick={exportar}>
					Exportar <IconExcel className='w-4 h-4 fill-white' />
				</Button>
			</div>

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
					{asistencias.map(({ expand: { miembro }, fecha }) => (
						<TableRow key={miembro.nombre}>
							<TableCell>
								<Avatar>
									<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</TableCell>
							<TableCell>{miembro.nombre}</TableCell>
							<TableCell>{miembro.apellido}</TableCell>
							<TableCell>{fecha}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Asistencias;
