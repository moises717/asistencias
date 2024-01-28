'use client';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function Modal({ children, title, description }: { children: React.ReactNode; title?: string; description?: string }) {
	const router = useRouter();

	const handleOnOpenChange = (open: boolean) => {
		if (!open) {
			router.back();
		}
	};
	return (
		<Dialog open onOpenChange={handleOnOpenChange}>
			<DialogContent className='sm:max-w-[425px]'>
				{title && description && (
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
				)}
				{children}
			</DialogContent>
		</Dialog>
	);
}
