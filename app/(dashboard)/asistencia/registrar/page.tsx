import { Suspense } from 'react';
import { format } from 'date-fns';

import { MemberCheckList } from '@/components/MemberCheckList';
import Loading from './loading';

const RegistrarAsistencia = () => {
	return (
		<div>
			<div className='p-1 flex gap-1'>
				<h1 className='font-semibold'>Registrar Asistencia - {format(new Date(), 'yyyy-MM-dd')}</h1>
			</div>
			<Suspense fallback={<Loading />}>
				<MemberCheckList />
			</Suspense>
		</div>
	);
};

export default RegistrarAsistencia;
