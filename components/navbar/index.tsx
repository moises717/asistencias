'use client';
import Link from 'next/link';
import { ListBulletIcon, PersonIcon, PlusCircledIcon } from '@radix-ui/react-icons';

import { Button } from '../ui/button';
import { IconExcel } from '../icons';

export const Navbar = () => {
	return (
		<div className='w-full flex pb-2 gap-4 justify-end md:justify-between'>
			<Link href='/'>
				<Button variant='secondary' className='flex gap-1'>
					<span className='hidden sm:block'>Miembros </span> <ListBulletIcon />
				</Button>
			</Link>
			<Link href='/inicio/asistencia'>
				<Button variant='secondary' className='flex gap-1 '>
					<span className='hidden sm:block'>Reportes</span>
					<IconExcel className='w-4 h-4' />
				</Button>
			</Link>
			<Link href='/inicio/asistencia/registrar'>
				<Button variant='secondary' className='flex gap-1 '>
					<span className='hidden sm:block'>Registrar asistencia</span>
					<PersonIcon />
				</Button>
			</Link>
			<Link href='/inicio/agregar-miembro'>
				<Button className='flex gap-1 '>
					<span className='hidden sm:block'>Nuevo miembro </span> <PlusCircledIcon />
				</Button>
			</Link>
		</div>
	);
};
