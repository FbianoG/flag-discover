/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Props {
	contry: { code: string; country: string };
}

const SideListItem = ({ contry }: Props) => {
	const [showFlag, setShowFlag] = useState<boolean>(false);

	return (
		<li
			onMouseEnter={() => setShowFlag(true)}
			onMouseLeave={() => setShowFlag(false)}
			className='hover:border-border group cursor-default border-b border-transparent bg-white p-1 duration-300'>
			<p className='duration-300 group-hover:opacity-70'>{contry.country}</p>
			{showFlag && (
				<div className='h-[200px] w-full translate-y-0 bg-white md:absolute md:top-1/2 md:left-[105%] md:w-[300px] md:-translate-y-1/2'>
					<Image loading='lazy' fill alt='' src={`/svg/${contry?.code}.svg`} className='border' />
				</div>
			)}
		</li>
	);
};

export default SideListItem;
