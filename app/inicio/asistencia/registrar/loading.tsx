import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
	return (
		<div className='flex flex-col gap-3'>
			{Array(10)
				.fill(0)
				.map((_, index) => (
					<Skeleton key={index} className='h-6 w-full' />
				))}
		</div>
	);
};

export default Loading;
