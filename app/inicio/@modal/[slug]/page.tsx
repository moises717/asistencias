'use client';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { pb } from '@/lib/pb';
import { PlusIcon } from '@radix-ui/react-icons';
import { Modal } from '@/components/Modal';

function AddMemberModal() {
	const [member, setMember] = useState({
		nombre: '',
		apellido: '',
	});
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMember(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCreateMember = async () => {
		await pb.collection('miembros').create(member);
		setMember({
			nombre: '',
			apellido: '',
		});
		toast.success('Miembro creado correctamente.');
	};

	return (
		<Modal>
			<Card className='sm:w-[350px] w-full border-none shadow-none'>
				<CardHeader className='flex flex-col gap-2'>
					<CardTitle className='text-lg'>Agregar Miembro</CardTitle>
					<CardDescription className='text-md'>Ingresa los datos del miembro que deseas agregar al equipo.</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Nombre</Label>
								<Input id='name' value={member.nombre} name='nombre' onChange={onChange} placeholder='Nombre' />
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='lastname'>Apellido</Label>
								<Input value={member.apellido} onChange={onChange} id='lastname' name='apellido' placeholder='Apellido' />
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button className='w-full flex gap-2' onClick={handleCreateMember}>
						Crear miembro {<PlusIcon className='w-4 h-4 fill-white' />}
					</Button>
				</CardFooter>
			</Card>
		</Modal>
	);
}

export default AddMemberModal;
