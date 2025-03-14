/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { CiCircleList } from 'react-icons/ci';
import { TfiClose } from 'react-icons/tfi';
import SideListItem from './SideListItem';
import useCountriesStore from '@/store/countriesStores';

const SideList = () => {
	const { countries } = useCountriesStore();

	const [showList, setShowList] = useState<boolean>(false);

	return (
		<>
			<button
				title='Lista de Países'
				onClick={() => setShowList(true)}
				className='fixed top-4 left-4 cursor-pointer rounded-full bg-white p-2 shadow duration-300 hover:bg-neutral-50 active:scale-95'>
				<CiCircleList size={30} />
			</button>
			<div style={{ left: showList ? 0 : '' }} className='fixed top-0 -left-72 h-screen md:w-72 w-[50dvw] bg-white p-4 pr-0 shadow duration-300 '>
				<button
					title='Fechar Lista'
					onClick={() => setShowList(false)}
					className='absolute top-2 right-2 cursor-pointer rounded-full bg-white p-3 shadow duration-300 hover:bg-neutral-50'>
					<TfiClose size={15} />
				</button>

				<h3 className='text-primary text-lg font-medium'>Lista de Paises</h3>
				<ul className='mt-4 h-[calc(100vh-65px)] overflow-auto pr-1'>
					{countries?.map((country, index) => <SideListItem key={index + country.code} country={country} />)}
				</ul>
			</div>
		</>
	);
};

export default SideList;
