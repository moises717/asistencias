import { Navbar } from '../../components/navbar';
import { Toaster } from '../../components/ui/sonner';

export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex items-center justify-center p-3'>
			<div className='md:max-w-[800px] w-full flex justify-center items-center'>
				<div className='md:p-16 w-full p-0'>
					<Navbar />
					{children}
				</div>
			</div>
			<Toaster />
		</div>
	);
}
