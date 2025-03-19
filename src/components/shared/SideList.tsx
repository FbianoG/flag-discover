/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import { CiCircleList } from 'react-icons/ci';
import { TfiClose } from 'react-icons/tfi';
import SideListItem from './SideListItem';
import { ICountry } from '@/interface/ICountry';
import { IWeapon } from '@/interface/IWeapon';
import { IBrand } from '@/interface/IBrand';

interface Props {
	title: string;
	groupActiveItens?: ICountry[] | IWeapon[] | IBrand[];
}

const SideList = ({ title, groupActiveItens }: Props) => {
	const [showList, setShowList] = useState<boolean>(false);
	const sideList = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Função que verifica se o clique foi fora do elemento
		const handleClickOutside = (event: MouseEvent) => {
			
			if (sideList.current && !sideList.current.contains(event.target as Node)) {
				setShowList(false); // Fecha a div se o clique for fora
			}
		};

		// Adiciona o event listener quando o componente monta
		document.addEventListener('mousedown', handleClickOutside);

		// Remove o event listener quando o componente desmonta
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div ref={sideList}>
			<button
				title='Lista de Países'
				onClick={() => setShowList(true)}
				className='fixed top-4 left-4 cursor-pointer rounded-full bg-white p-2 shadow duration-300 hover:bg-neutral-50 active:scale-95'>
				<CiCircleList size={30} />
			</button>
			<div style={{ left: showList ? 0 : '' }} className='fixed top-0 -left-72 z-50 h-screen w-[50dvw] bg-slate-800 p-4 pr-0 shadow duration-300 md:w-72'>
				<button
					title='Fechar Lista'
					onClick={() => setShowList(false)}
					className='absolute top-2 text-slate-400 right-2 cursor-pointer rounded-full bg-transparent p-3 shadow duration-300 hover:bg-slate-700'>
					<TfiClose size={15} />
				</button>

				<h3 className=' text-lg font-medium text-slate-400'>{title}</h3>
				<ul className='mt-4 h-[calc(100vh-65px)] overflow-auto bg-transparent pr-1'>{groupActiveItens?.map((item, index) => <SideListItem key={index + item.code} item={item} />)}</ul>
			</div>
		</div>
	);
};

export default SideList;
