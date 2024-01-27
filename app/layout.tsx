import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Asistencia iglesia el de Dios el cordero',
	description: 'Asistencia iglesia el de Dios el cordero',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es'>
			<body className={`${inter.className} h-full`}>
				<main className='flex justify-center items-center'>
					<div className='w-full'>{children}</div>
				</main>
			</body>
		</html>
	);
}
