import { Suspense } from 'react';

import { MemberCheckList } from '@/components/MemberCheckList';
import Loading from './loading';

const RegistrarAsistencia = () => {
	return (
		<div>
			<Suspense fallback={<Loading />}>
				<MemberCheckList />
			</Suspense>
		</div>
	);
};

export default RegistrarAsistencia;
