/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Points from './Points.';
import Image from 'next/image';
import Option from './Option';
import { useEffect, useState } from 'react';
import { ICountry } from '@/interface/ICountry';
import SideList from './SideList';
import usePointsStore from '@/store/pointsStore';
import { IWeapon } from '@/interface/IWeapon';

const Countries = () => {
	const { setCorrect, setIncorrect } = usePointsStore();

	const [countries, setCountries] = useState<ICountry[]>();

	const [currentCountry, setCurrentCountry] = useState<ICountry>();

	const [pastCountries, setPastCountries] = useState<ICountry[]>([]);

	const [options, setOptions] = useState<ICountry[]>();

	const [loading, setLoading] = useState<boolean>(false);

	const { setClear } = usePointsStore();

	useEffect(() => {
		(async () => {
			const response = await fetch('/json/countries.json');
			const data = await response.json();
			const sortData = data.sort((a: ICountry, b: ICountry) => a.name.localeCompare(b.name));
			setCountries(sortData);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
		return () => {
			setPastCountries([]);
			setCurrentCountry(undefined);
			setOptions(undefined);
			setLoading(false);
			setCountries(undefined);
			setClear();
		};
	}, []);

	useEffect(() => {
		if (!countries) return;
		selectCountry();
	}, [countries]);

	useEffect(() => {
		if (currentCountry && countries && countries.length > 0) {
			const newOptions = []; // Evita duplicatas

			while (newOptions.length < 3) {
				const random = Math.floor(Math.random() * countries.length);
				const randomCountry = countries[random];

				if (!pastCountries.includes(randomCountry) && randomCountry !== currentCountry) {
					newOptions.push(randomCountry);
				}
			}

			newOptions.push(currentCountry);

			newOptions.sort(() => Math.random() - 0.5);

			setOptions(newOptions);
		}
	}, [currentCountry]);

	const selectCountry = () => {
		if (!countries) return;
		if (pastCountries.length + 1 == countries?.length) return;

		console.log(pastCountries.length, countries?.length);

		const random = Math.floor(Math.random() * countries.length);
		if (pastCountries.includes(countries[random]) || countries[random] === currentCountry) return selectCountry();
		console.log(countries[random]);

		setCurrentCountry(countries[random]);
		setLoading(false);
	};

	const handleSelect = (option: ICountry | IWeapon) => {
		if (loading) return;
		if (pastCountries.length > 24) return;
		setLoading(true);
		if (option.code === currentCountry?.code) {
			setCorrect();
			// setBgColor('bg-emerald-400');
			const audio = new Audio('/audio/check.mp3');
			audio.play();
		} else {
			setIncorrect();
			// setBgColor('bg-red-400');
			const audio = new Audio('/audio/wrong.mp3');
			audio.play();
		}
		setPastCountries([...pastCountries, option as ICountry]);
		// setOptions(undefined);
		setTimeout(() => {
			selectCountry();
		}, 400);
	};

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-2 p-4 md:p-16'>
			<SideList title='Lista de Paises' groupActiveItens={countries} />

			<Points />


			{pastCountries.length <= 24 && (
				<div className='grid h-[300px] place-items-center'>
					<div className='rounded border bg-white'>
						<Image
							loading='lazy'
							width={300}
							height={200}
							alt=''
							src={`/svg/${currentCountry?.code.toLocaleLowerCase()}.svg`}
							className='hidden max-h-[200px] border md:block'
						/>
						<Image loading='lazy' width={300} height={200} alt='' src={`/svg/${currentCountry?.code.toLocaleLowerCase()}.svg`} className='border md:hidden' />
					</div>
				</div>
			)}

			<div className='md:p-4'>
				<h2 className='text-center text-lg font-medium text-slate-400 md:text-2xl'>
					{pastCountries.length <= 24 ? 'Qual o país corresponde a essa bandeira?' : 'Fim do jogo'}
				</h2>
			</div>

			<div className='mt-4 flex flex-col gap-3'>
				{pastCountries.length <= 24 &&
					currentCountry &&
					options?.map((option, index) => (
						<Option key={option.code} index={index} option={option} handleSelect={handleSelect} loading={loading} correct={currentCountry} />
					))}
			</div>

			{pastCountries.length > 24 && (
				<button className='cursor-pointer rounded bg-emerald-500 p-4 text-lg text-white shadow duration-300 hover:bg-emerald-400' onClick={() => location.reload()}>
					Reiniciar Jogo
				</button>
			)}
		</div>
	);
};

export default Countries;
