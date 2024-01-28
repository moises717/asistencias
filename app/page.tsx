'use client';
import { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { pb } from '../lib/pb';
import { useRouter } from 'next/navigation';

const Login = () => {
	const [user, setUser] = useState({
		username: '',
		password: '',
	});

	const navigate = useRouter();

	const handleAuth = async () => {
		const result = await pb.collection('users').authWithPassword(user.username, user.password);

		if (result) return navigate.push('/inicio');
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		const checkUser = async () => {
			const result = pb.authStore.isValid;

			if (result) return navigate.push('/inicio');
		};

		checkUser();
	}, []);

	return (
		<div className='flex justify-center items-center w-full h-screen p-3'>
			<Card className='md:w-[350px] w-full'>
				<CardHeader>
					<CardTitle>Iniciar Sesión</CardTitle>
					<CardDescription>Usuarios iglesia de Dios el cordero.</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Usuario</Label>
								<Input id='name' name='username' autoComplete='off' value={user.username} onChange={handleInput} placeholder='Ingresa el usuario.' />
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Contraseña</Label>
								<Input
									id='name'
									name='password'
									value={user.password}
									onChange={handleInput}
									autoComplete='off'
									placeholder='Ingrese su contraseña.'
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button className='w-full' variant='default' onClick={handleAuth}>
						Iniciar Sesión
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Login;
