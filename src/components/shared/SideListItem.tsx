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
import { IWeapon } from '@/interface/IWeapon';
import Image from 'next/image';
import { GiMachineGunMagazine } from 'react-icons/gi';
import { RiWeightLine } from 'react-icons/ri';
import { SlTarget } from 'react-icons/sl';
import { MdOutlinePrecisionManufacturing } from 'react-icons/md';
import { GiPistolGun } from 'react-icons/gi';
import { IBrand } from '@/interface/IBrand';
import { PiLineSegmentsBold } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";

interface Props {
	item: ICountry | IWeapon | IBrand;
}

const SideListItem = ({ item }: Props) => {
	const [showDetails, setShowDetails] = useState<boolean>(false);

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
			onMouseEnter={() => setShowDetails(true)}
			onMouseLeave={() => setShowDetails(false)}
			className='hover:border-border group cursor-default border-b border-transparent text-slate-300 p-1 duration-300'>
			<p className='duration-300 group-hover:opacity-70'>{item.name}</p>
			{showDetails && (
				<div className='absolute top-0 left-full h-screen w-[50dvw] overflow-y-auto bg-slate-800 p-4 shadow md:w-72'>
					<h5 className='text-primary text-center text-lg'>Detalhes</h5>

					<h5 className='mx-auto my-4 w-max max-w-full text-center font-medium underline underline-offset-2'>{item.name}</h5>

					<div className='flex flex-col gap-2'>
						{'continent' in item.details && (
							<>
								<div className=''>
									<img src={`/svg/${item.code.toLocaleLowerCase()}.svg`} alt='' />
								</div>
								<Describle title='Descrição' text={item.details.description} icon={<CiTextAlignCenter />} />
								<Describle title='Região' text={item.details.continent} icon={<PiGlobeHemisphereWestLight />} />
								<Describle title='Capital' text={item.details.capital} icon={<CiLocationOn />} />
								<Describle title='População' text={Number(item.details.population).toLocaleString('pt-BR')} icon={<BsPeople />} />
								<Describle title='Dimensão' text={Number(item.details.area).toLocaleString('pt-BR') + ' km²'} icon={<PiResizeLight />} />
								<Describle
									title='PIB'
									text={'USD ' + Number(item.details.gdp * 1000000).toLocaleString('pt-BR', { currency: 'USD' })}
									icon={<PiCurrencyCircleDollar />}
								/>
							</>
						)}

						{'caliber' in item.details && (
							<>
								<div className=''>
									<Image width={400} height={300} loading='lazy' alt='' src={`/img/${item.code}.webp`} className='' />
								</div>
								<Describle title='Descrição' text={item.details.description} icon={<CiTextAlignCenter />} />
								<Describle title='Tipo' text={item.details.type} icon={<GiPistolGun />} />
								<Describle title='País' text={item.details.country} icon={<PiGlobeHemisphereWestLight />} />
								<Describle title='Fabricante' text={item.details.manufacturer} icon={<MdOutlinePrecisionManufacturing />} />
								<Describle title='Calibre' text={item.details.caliber} icon={<SlTarget />} />
								<Describle title='Capacidade' text={item.details.capacity.toLocaleString()} icon={<GiMachineGunMagazine />} />
								<Describle title='Peso' text={item.details.weight.toString() + ' kg'} icon={<RiWeightLine />} />
							</>
						)}

						{'segment' in item.details && (
							<>
								<div className=''>
									<Image width={400} height={300} loading='lazy' alt='' src={`/img/${item.code}.webp`} className='' />
								</div>
								<Describle title='Descrição' text={item.details.description} icon={<CiTextAlignCenter />} />
								<Describle title='País' text={item.details.country} icon={<PiGlobeHemisphereWestLight />} />
								<Describle title='Segmento' text={item.details.segment} icon={<PiLineSegmentsBold />} />
								<Describle title='Ano' text={item.details.year.toString()} icon={<IoCalendarOutline />} />
							</>
						)}
					</div>
				</div>
			)}
		</li>
	);
};

export default SideListItem;
