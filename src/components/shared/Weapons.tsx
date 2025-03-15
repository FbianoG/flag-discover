'use client';
import { IWeapon } from '@/interface/IWeapon';
import SideList from './SideList';
import { useEffect, useState } from 'react';
import Points from './Points.';
import Option from './Option';
import usePointsStore from '@/store/pointsStore';
import { ICountry } from '@/interface/ICountry';
import Image from 'next/image';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
const Weapons = () => {
	const { setCorrect, setIncorrect } = usePointsStore();

	const [weapons, setWeapons] = useState<IWeapon[]>();

	const [currentWeapon, setCurrentWeapon] = useState<IWeapon>();

	const [pastWeapons, setPastWeapons] = useState<IWeapon[]>([]);

	const [options, setOptions] = useState<IWeapon[]>();

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const pistol = await fetch('/json/pistol.json');
			const pistolData = await pistol.json();
			const rifles = await fetch('/json/rifles.json');
			const riflesData = await rifles.json();

			await setWeapons([...pistolData, ...riflesData]);
		})();
	}, []);

	useEffect(() => {
		if (!weapons) return;
		selectWeapon();
	}, [weapons]);

	useEffect(() => {
		if (!currentWeapon || !weapons) return;

		const newOptions = [currentWeapon];

		while (newOptions.length < 4) {
			const random = Math.floor(Math.random() * weapons.length);

			if (!newOptions.includes(weapons[random]) && !pastWeapons.includes(weapons[random]) && weapons[random] !== currentWeapon) newOptions.push(weapons[random]);
		}

		setOptions(newOptions.sort(() => Math.random() - 0.5));
	}, [currentWeapon]);

	const selectWeapon = () => {
		if (!weapons) return;
		if (pastWeapons.length + 1 == weapons?.length) return;

		console.log(pastWeapons.length, weapons?.length);

		const random = Math.floor(Math.random() * weapons.length);
		if (pastWeapons.includes(weapons[random]) || weapons[random] === currentWeapon) return selectWeapon();
		console.log(weapons[random]);

		setCurrentWeapon(weapons[random]);
		setLoading(false);
	};

	const handleSelect = (option: IWeapon | ICountry) => {
		if (loading) return;
		if (pastWeapons.length > 24) return;
		setLoading(true);
		if (option.code === currentWeapon?.code) {
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
		setPastWeapons([...pastWeapons, option as IWeapon]);
		// setOptions(undefined);
		setTimeout(() => {
			selectWeapon();
		}, 400);
	};

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-2 p-4 md:p-16'>
			<SideList title='Lista de Armas' groupActiveItens={weapons} />

			<Points />

			{pastWeapons.length < 25 && (
				<div className='grid h-[300px] place-items-center'>
					<div className='rounded border bg-white'>
						<Image loading='lazy' width={350} height={280} alt='' src={`/img/${currentWeapon?.code}.webp`} className='border object-cover' />
					</div>
				</div>
			)}

			<div className='rounded border bg-white p-1 md:p-4'>
				<h2 className='text-primary text-center text-lg md:text-2xl'>{pastWeapons.length <= 24 ? 'Qual arma corresponde a essa imagem?' : 'Fim do jogo'}</h2>
			</div>

			<div className='mt-4 flex flex-col gap-3'>
				{pastWeapons.length < 25 &&
					options?.map((option, index) => <Option key={option.code} index={index} option={option as IWeapon} handleSelect={handleSelect} loading={loading} />)}
			</div>
		</div>
	);
};

export default Weapons;
