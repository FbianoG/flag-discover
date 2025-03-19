/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import usePointsStore from '@/store/pointsStore';

const Points = () => {
	const { correct, incorrect } = usePointsStore();

	return (
		<div className='flex justify-center gap-4 text-slate-200'>
			<div className='flex w-[75px] flex-col overflow-hidden rounded  text-center shadow'>
				<p className='bg-emerald-500/50  p-1'>Acertos</p>
				<h4 className='bg-emerald-400/60 p-1'>{correct}</h4>
			</div>
			<div className='flex w-[75px] flex-col overflow-hidden rounded text-center shadow'>
				<p className='bg-red-400/50 p-1'>Erros</p>
				<h4 className='bg-red-300/60 p-1'>{incorrect}</h4>
			</div>
		</div>
	);
};

export default Points;
