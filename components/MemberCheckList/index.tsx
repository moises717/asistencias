'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useDebounce } from 'use-debounce';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { pb } from '@/lib/pb';
import { type Miembro } from '@/app/inicio/page';
import { Checkbox } from '@/components/ui/checkbox';
import { type Asistencia } from '@/app/inicio/asistencia/page';
import { Input } from '@/components/ui/input';

export const MemberCheckList = () => {
	const [asistencias, setAsistencia] = useState<Asistencia[]>([]);
	const [miembros, setMiembros] = useState<Miembro[]>([]);
	const [filterParams, setFilterParams] = useState<string>('');
	const [filter] = useDebounce(filterParams, 300);
	const [isLoading, setIsLoading] = useState(false);

	const date = format(new Date(), 'yyyy-MM-dd');

	const obtenerAsistencias = async () => {
		const data = await pb.collection<Asistencia>('asistencias').getFullList({
			filter: pb.filter('fecha = {:date}', { date }),
		});
		return data;
	};

	const getMiembros = async () => {
		const data = await pb.collection<Miembro>('miembros').getFullList();
		return data;
	};

	const handleCheck = async (miembro: Miembro, check: CheckedState) => {
		setIsLoading(true);
		if (check) {
			await pb.collection('asistencias').create({
				miembro: miembro.id,
				presente: true,
				fecha: date.toString(),
			});
			const asistenciasActualizadas = await obtenerAsistencias();

			setAsistencia(asistenciasActualizadas);
			setIsLoading(false);
			return;
		}

		const asistencia = asistencias.find(asistencia => {
			return asistencia.miembro === miembro.id;
		});

		if (!asistencia) return;

		await pb.collection('asistencias').delete(asistencia?.id);

		const asistenciasActualizadas = await obtenerAsistencias();

		setAsistencia(asistenciasActualizadas);
		setIsLoading(false);
	};

	const filterMembers = async () => {
		const members = await pb.collection<Miembro>('miembros').getFullList({
			filter: pb.filter('nombre ~ {:filterParams} || apellido ~ {:filterParams}', { filterParams }),
		});

		setMiembros(members);
	};

	useEffect(() => {
		filterMembers();

		if (filterParams === '') {
			Promise.all([getMiembros(), obtenerAsistencias()]).then(([miembros, asistencias]) => {
				setMiembros(miembros);
				setAsistencia(asistencias);
			});
		}
	}, [filter]);

	return (
		<div>
			<div className='pb-2 flex md:justify-between gap-3'>
				<Input placeholder='Buscar miembro' className='md:w-[190px]' value={filterParams} onChange={e => setFilterParams(e.target.value)} />
				<h1 className='font-semibold self-center text-[0.7em] md:text-lg'>Registrar Asistencia - {format(new Date(), 'yyyy-MM-dd')}</h1>
			</div>
			<Table className='border w-full mt-3'>
				<TableCaption>Lista de miembros.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Imagen</TableHead>
						<TableHead>Nombre</TableHead>
						<TableHead>Apellido</TableHead>
						<TableHead>Presente</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{miembros.map(miembro => {
						const isChecked = asistencias.some(asistencia => asistencia.miembro === miembro.id);
						return (
							<TableRow key={miembro.id}>
								<TableCell>
									<Avatar>
										<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</TableCell>
								<TableCell>{miembro.nombre}</TableCell>
								<TableCell>{miembro.apellido}</TableCell>
								<TableCell>
									<Checkbox disabled={isLoading} defaultChecked={isChecked} onCheckedChange={c => handleCheck(miembro, c)} />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
};
