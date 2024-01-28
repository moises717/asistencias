'use client';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { pb } from '@/lib/pb';

function AddMember() {
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
		<div className='w-full h-[calc(100vh-200px)] flex items-center justify-center'>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle>Agregar Miembro</CardTitle>
					<CardDescription>Ingresa los datos del miembro que deseas agregar al equipo.</CardDescription>
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
					<Button className='w-full' onClick={handleCreateMember}>
						Crear miembro
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export default AddMember;
