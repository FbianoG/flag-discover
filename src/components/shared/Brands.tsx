/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';
import Points from './Points.';
import SideList from './SideList';
import { useEffect, useState } from 'react';
import usePointsStore from '@/store/pointsStore';
import { IBrand } from '@/interface/IBrand';
import { IWeapon } from '@/interface/IWeapon';
import Option from './Option';

const Brands = () => {
	const { setCorrect, setIncorrect } = usePointsStore();

	const [Brands, setBrands] = useState<IBrand[]>();

	const [currentBrand, setCurrentBrand] = useState<IBrand>();

	const [pastBrands, setPastBrands] = useState<IBrand[]>([]);

	const [options, setOptions] = useState<IBrand[]>();

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const response = await fetch('/json/brands.json');
			const data = await response.json();
			const sortData = data.sort((a: IBrand, b: IBrand) => a.name.localeCompare(b.name));
			setBrands(sortData);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!Brands) return;
		selectBrand();
	}, [Brands]);

	useEffect(() => {
		if (currentBrand && Brands && Brands.length > 0) {
			const newOptions = []; // Evita duplicatas

			while (newOptions.length < 3) {
				const random = Math.floor(Math.random() * Brands.length);
				const randomBrand = Brands[random];

				if (!pastBrands.includes(randomBrand) && randomBrand !== currentBrand) {
					newOptions.push(randomBrand);
				}
			}

			newOptions.push(currentBrand);

			newOptions.sort(() => Math.random() - 0.5);

			setOptions(newOptions);
		}
	}, [currentBrand]);

	const selectBrand = () => {
		if (!Brands) return;
		if (pastBrands.length + 1 == Brands?.length) return;

		console.log(pastBrands.length, Brands?.length);

		const random = Math.floor(Math.random() * Brands.length);
		if (pastBrands.includes(Brands[random]) || Brands[random] === currentBrand) return selectBrand();
		console.log(Brands[random]);

		setCurrentBrand(Brands[random]);
		setLoading(false);
	};

	const handleSelect = (option: IBrand | IWeapon) => {
		if (loading) return;
		if (pastBrands.length > 24) return;
		setLoading(true);
		if (option.code === currentBrand?.code) {
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
		setPastBrands([...pastBrands, option as IBrand]);
		// setOptions(undefined);
		setTimeout(() => {
			selectBrand();
		}, 400);
	};

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-2 p-4 md:p-16'>
			<SideList title='Lista de Paises' groupActiveItens={Brands} />

			<Points />

			{pastBrands.length <= 24 && (
				<div className='grid h-[300px] place-items-center'>
					<div className='rounded border bg-white'>
						<Image
							loading='lazy'
							width={250}
							height={250}
							alt=''
							src={`/img/${currentBrand?.code.toLocaleLowerCase()}.webp`}
							className='hidden max-h-[250px] border md:block'
						/>
						<Image loading='lazy' width={250} height={250} alt='' src={`/img/${currentBrand?.code}.webp`} className='border md:hidden' />
					</div>
				</div>
			)}

			<div className='rounded border bg-white p-1 md:p-4'>
				<h2 className='text-primary text-center text-lg md:text-2xl'>{pastBrands.length <= 24 ? 'Qual o país corresponde a essa bandeira?' : 'Fim do jogo'}</h2>
			</div>

			<div className='mt-4 flex flex-col gap-3'>
				{pastBrands.length < 25 &&
					options?.map((option, index) => <Option key={option.code} index={index} option={option} handleSelect={handleSelect} loading={loading} />)}
			</div>

			{pastBrands.length > 24 && (
				<button className='cursor-pointer rounded bg-emerald-500 p-4 text-lg text-white shadow duration-300 hover:bg-emerald-400' onClick={() => location.reload()}>
					Reiniciar Jogo
				</button>
			)}
		</div>
	);
};

export default Brands;
