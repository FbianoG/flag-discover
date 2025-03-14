/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import { ICountry } from '@/interface/ICountry';
import { PiGlobeHemisphereWestLight } from 'react-icons/pi';
import { CiLocationOn } from 'react-icons/ci';
import { BsPeople } from 'react-icons/bs';
import { PiResizeLight } from 'react-icons/pi';
import { PiCurrencyCircleDollar } from 'react-icons/pi';
import { CiTextAlignCenter } from 'react-icons/ci';

interface Props {
	country: ICountry;
}

const SideListItem = ({ country }: Props) => {
	const [showFlag, setShowFlag] = useState<boolean>(false);

	const Describle = ({ title, text, icon }: { title: string; text: string; icon: any }) => (
		<div>
			<h6 className='text-primary flex items-center gap-1 font-medium'>
				{icon}
				{title}:
			</h6>
			<p className='text-justify indent-2 text-sm opacity-90'>{text}</p>
		</div>
	);

	return (
		<li
			onMouseEnter={() => setShowFlag(true)}
			onMouseLeave={() => setShowFlag(false)}
			className='hover:border-border group cursor-default border-b border-transparent bg-white p-1 duration-300'>
			<p className='duration-300 group-hover:opacity-70'>{country.country}</p>
			{showFlag && (
				<div className='absolute top-0 left-full h-screen md:w-72 w-[50dvw] bg-white p-4 shadow overflow-y-auto'>
					<h5 className='text-primary text-center text-lg'>Detalhes</h5>

					<h5 className='mx-auto my-4 w-max max-w-full text-center font-medium underline underline-offset-2'>{country.country}</h5>

					<div className='flex flex-col gap-2'>
						<div className=''>
							<img src={`/svg/${country.code}.svg`} alt='' />
						</div>

						<Describle title='Descrição' text={country.details.description} icon={<CiTextAlignCenter />} />
						<Describle title='Região' text={country.details.continent} icon={<PiGlobeHemisphereWestLight />} />
						<Describle title='Capital' text={country.details.capital} icon={<CiLocationOn />} />
						<Describle title='População' text={Number(country.details.population).toLocaleString('pt-BR')} icon={<BsPeople />} />
						<Describle title='Dimensão' text={Number(country.details.area).toLocaleString('pt-BR') + ' km²'} icon={<PiResizeLight />} />
						<Describle
							title='PIB'
							text={'USD ' + Number(country.details.gdp * 1000000).toLocaleString('pt-BR', { currency: 'USD' })}
							icon={<PiCurrencyCircleDollar />}
						/>
					</div>
				</div>
			)}
		</li>
	);
};

export default SideListItem;
