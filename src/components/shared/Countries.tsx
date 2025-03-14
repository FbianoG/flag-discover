/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import useCountriesStore from '@/store/countriesStores';
import Points from './Points.';
import Image from 'next/image';
import Option from './Option';
import { useEffect, useState } from 'react';
import { ICountry } from '@/interface/ICountry';

const Countries = () => {
	const { countries, setCountries, pastCountries, country, setCountry, optionsCountries, setOptionsCountries } = useCountriesStore();

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const response = await fetch('/json/countries.json');
			const data = await response.json();

			const sortData = data.sort((a: ICountry, b: ICountry) => a.country.localeCompare(b.country));

			setCountries(sortData);
			console.log(sortData);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (countries && countries.length > 0) {
			const random = Math.floor(Math.random() * countries.length);
			setCountry(countries[random]);
			console.log('aqui', countries[random]);
		}
	}, [countries]);

	useEffect(() => {
		if (country && countries && countries.length > 0) {
			const newOptions = []; // Evita duplicatas

			while (newOptions.length < 3) {
				const random = Math.floor(Math.random() * countries.length);
				const randomCountry = countries[random];

				if (!pastCountries.includes(randomCountry) && randomCountry !== country) {
					newOptions.push(randomCountry);
				}
			}

			newOptions.push(country);

			newOptions.sort(() => Math.random() - 0.5);

			setOptionsCountries(newOptions);
			console.log(newOptions);
		}
	}, [country]);

	const selectCountry = () => {
		console.log('oioi');
		if (loading) return;
		setLoading(true);
		if (!countries) return;
		if (pastCountries.length > 24) return;
		setOptionsCountries([]);
		const random = Math.floor(Math.random() * countries.length);
		if (pastCountries.includes(countries[random]) || countries[random] === country) return selectCountry();
		setCountry(countries[random]);
		setLoading(false);
	};

	return (
		<div className='flex h-screen flex-col items-center justify-center gap-2 bg-amber-100'>
			<Points />

			{pastCountries.length <= 24 && (
				<div className='relative grid h-[200px] w-[300px] items-center justify-center rounded border bg-white'>
					<Image loading='lazy' fill alt='' src={`/svg/${country?.code.toLocaleLowerCase()}.svg`} className='hidden border md:block' />
					<Image loading='lazy' fill alt='' src={`/svg/${country?.code.toLocaleLowerCase()}.svg`} className='border md:hidden' />
				</div>
			)}

			<div className='relative rounded border bg-white p-1 md:p-4'>
				<h2 className='text-primary text-center text-lg md:text-2xl'>{pastCountries.length <= 24 ? 'Qual o país corresponde a essa bandeira?' : 'Fim do jogo'}</h2>
			</div>

			<div className='mt-4 flex flex-col gap-3'>
				{pastCountries.length <= 24 &&
					optionsCountries?.map((option, index) => (
						<Option key={option.code} optionCountry={option} index={index} selectCountry={selectCountry} loading={loading} setLoading={setLoading} />
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
