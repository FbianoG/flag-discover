/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ICountry } from '@/interface/ICountry';
import useCountriesStore from '@/store/countriesStores';
import usePointsStore from '@/store/pointsStore';
import { useState } from 'react';

interface Props {
	optionCountry: ICountry;
	index: number;
	selectCountry: () => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
}

const Option = ({ optionCountry, index, selectCountry, loading, setLoading }: Props) => {
	const [bgColor, setBgColor] = useState<string>();

	const { setCorrect, setIncorrect } = usePointsStore();

	const { country, setPastCountries } = useCountriesStore();

	const handleClick = () => {
		if (loading) return;
		setLoading(true);
		if (optionCountry.code === country?.code) {
			setCorrect();
			setBgColor('bg-emerald-400');

			const audio = new Audio('/audio/check.mp3');
			audio.play();
		} else {
			setIncorrect();
			setBgColor('bg-red-400');
			const audio = new Audio('/audio/wrong.mp3');
			audio.play();
		}

		setPastCountries(country as ICountry);
		setTimeout(() => {
			selectCountry();
		}, 400);
	};

	return (
		<button
			disabled={loading}
			className='flex h-[70px] w-[350px] cursor-pointer overflow-hidden rounded bg-white shadow duration-300 hover:scale-[1.02] hover:ring'
			onClick={handleClick}>
			<div className={`grid h-full w-[50px] place-items-center ${bgColor || 'bg-blue-400'} text-xl font-medium text-white`}>{index}</div>
			<p className='text-primary grid h-full flex-1 place-items-center text-lg'>{optionCountry.country}</p>
		</button>
	);
};

export default Option;
