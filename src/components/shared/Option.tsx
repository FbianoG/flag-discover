/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { IBrand } from '@/interface/IBrand';
import { ICountry } from '@/interface/ICountry';
import { IWeapon } from '@/interface/IWeapon';

interface Props {
	index: number;
	option: ICountry | IWeapon | IBrand;
	handleSelect: any;
	loading: boolean;
}

const Option = ({ option, index, handleSelect, loading }: Props) => {
	// const [bgColor, setBgColor] = useState<string>();

	return (
		<button
			disabled={loading}
			className='flex h-[70px] w-[350px] cursor-pointer overflow-hidden rounded bg-white shadow duration-300 hover:scale-[1.02] hover:ring'
			onClick={() => handleSelect(option)}>
			{/* <div className={`grid h-full w-[50px] place-items-center ${bgColor || 'bg-blue-400'} text-xl font-medium text-white`}>{index}</div> */}
			<div className={`grid h-full w-[50px] place-items-center bg-blue-400 text-xl font-medium text-white`}>{index}</div>
			<p className='text-primary grid h-full flex-1 place-items-center text-lg'>{option.name}</p>
		</button>
	);
};

export default Option;
