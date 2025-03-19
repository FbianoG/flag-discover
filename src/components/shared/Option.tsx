/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { IBrand } from '@/interface/IBrand';
import { ICountry } from '@/interface/ICountry';
import { IWeapon } from '@/interface/IWeapon';
import { useState } from 'react';

interface Props {
	index: number;
	option: ICountry | IWeapon | IBrand;
	correct: ICountry | IWeapon | IBrand;
	handleSelect: any;
	loading: boolean;
}

const Option = ({ option, index, handleSelect, loading, correct }: Props) => {
	const [bgColor, setBgColor] = useState<string>();

	return (
		<button
			disabled={loading}
			className='flex h-[70px] w-[350px] cursor-pointer overflow-hidden rounded bg-slate-800 shadow duration-300 hover:scale-[1.02] hover:bg-slate-700'
			onClick={() => {
				handleSelect(option);
				if (correct === option) setBgColor('bg-emerald-400');
				else setBgColor('bg-red-400');
			}}>
			{/* <div className={`grid h-full w-[50px] place-items-center ${bgColor || 'bg-blue-400'} text-xl font-medium text-white`}>{index}</div> */}
			<div className={`grid h-full w-[50px] place-items-center ${bgColor || 'bg-slate-700'} text-xl font-medium text-white`}>{index}</div>
			<p className='grid h-full flex-1 place-items-center text-lg text-slate-300'>{option.name}</p>
		</button>
	);
};

export default Option;
