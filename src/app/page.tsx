'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from './button';
import SideList from './SideList';

export default function Home() {
	const [contries, setContries] = useState<{ code: string; country: string }[]>();

	const [right, setRight] = useState<number>(0);

	const [wrong, setWrong] = useState<number>(0);

	const [contry, setContry] = useState<{ code: string; country: string }>();

	const [options, setOptions] = useState<{ code: string; country: string }[]>();

	const [pastContries, setPastContries] = useState<{ code: string; country: string }[]>([]);

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const response = await fetch('/json/contries.json');
			const data = await response.json();
			const countryArray = Object.entries(data).map(([code, country]) => ({ code, country }));
			setContries(countryArray as { code: string; country: string }[]);
		})();
	}, []);

	useEffect(() => {
		if (contries) {
			const random = Math.floor(Math.random() * contries.length);
			setContry(contries[random]);
		}
	}, [contries]);

	useEffect(() => {
		if (contry && contries) {
			const newOptions = []; // Evita duplicatas

			while (newOptions.length < 3) {
				const random = Math.floor(Math.random() * contries.length);
				const randomCountry = contries[random];

				if (!pastContries.includes(randomCountry) && randomCountry !== contry) {
					newOptions.push(randomCountry);
				}
			}

			newOptions.push(contry);

			newOptions.sort(() => Math.random() - 0.5);

			setOptions(newOptions);
		}
	}, [contry]);

	const selectContry = () => {
		if (!contries) return;
		if (pastContries.length > 24) return;
		setOptions([]);
		const random = Math.floor(Math.random() * contries.length);
		if (pastContries.includes(contries[random]) || contries[random] === contry) return selectContry();
		setContry(contries[random]);
		setLoading(false);
	};

	return (
		<>
			<div className='flex h-screen flex-col items-center justify-center gap-2 bg-amber-100'>
				<div className='flex justify-center gap-4'>
					<div className='flex w-[75px] flex-col overflow-hidden rounded text-center shadow'>
						<p className='bg-emerald-500 p-1'>Acertos</p>
						<h4 className='bg-emerald-400 p-1'>{right}</h4>
					</div>
					<div className='flex w-[75px] flex-col overflow-hidden rounded text-center shadow'>
						<p className='bg-red-400 p-1'>Erros</p>
						<h4 className='bg-red-300 p-1'>{wrong}</h4>
					</div>
				</div>
				{pastContries.length <= 24 && (
					<div className='relative grid h-[200px] w-[300px] items-center justify-center rounded border bg-white'>
						<Image loading='lazy' fill alt='' src={`/svg/${contry?.code}.svg`} className='hidden border md:block' />
						<Image loading='lazy' fill alt='' src={`/svg/${contry?.code}.svg`} className='border md:hidden' />
					</div>
				)}
				<div className='relative rounded border bg-white p-1 md:p-4'>
					<h2 className='text-primary text-center text-lg md:text-2xl'>{pastContries.length <= 24 ? 'Qual o país corresponde a essa bandeira?' : 'Fim do jogo'}</h2>
				</div>

				<div className='mt-4 flex flex-col gap-3'>
					{pastContries.length <= 24 &&
						options?.map((option, index) => (
							<Button
								key={option.code}
								code={option.code}
								title={option.country}
								index={index}
								loading={loading}
								setLoading={setLoading}
								setRight={setRight}
								setWrong={setWrong}
								setPastContries={setPastContries}
								contry={contry}
								selectContry={selectContry}
								pastContries={pastContries}
							/>
						))}
				</div>

				{pastContries.length > 24 && (
					<button className='cursor-pointer rounded bg-emerald-500 p-4 text-lg text-white shadow duration-300 hover:bg-emerald-400' onClick={() => location.reload()}>
						Reiniciar Jogo
					</button>
				)}
			</div>
			<SideList  contries={contries}/>
		</>
	);
}
