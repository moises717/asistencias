'use client';
import { useEffect, useState } from 'react';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { pb } from '@/lib/pb';

export interface Miembro {
	id: string;
	nombre: string;
	apellido: string;
	created: string;
	image: string;
}

export default function Home() {
	const [miembros, setMiembros] = useState<Miembro[]>([]);

	useEffect(() => {
		const getMiembros = async () => {
			const data = await pb.collection<Miembro>('miembros').getFullList();
			setMiembros(data);
		};

		getMiembros();
	}, []);

	return (
		<Table className='border w-full mt-3'>
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
				{miembros.map(({ apellido, nombre, created }) => (
					<TableRow key={nombre}>
						<TableCell>
							<Avatar>
								<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</TableCell>
						<TableCell>{nombre}</TableCell>
						<TableCell>{apellido}</TableCell>
						<TableCell>{created}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
