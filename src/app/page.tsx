'use client';

import Countries from '@/components/shared/Countries';
import Weapons from '@/components/shared/Weapons';
import { useState } from 'react';
import { GiPistolGun } from 'react-icons/gi';
import { BiWorld } from 'react-icons/bi';
import { TbBrandSublimeText } from 'react-icons/tb';
import Brands from '@/components/shared/Brands';

export default function Home() {
	const [type, setType] = useState<'countries' | 'weapons' | 'brand'>('countries');

	const classBtn = 'cursor-pointer rounded-full border p-2 shadow duration-300 hover:border-transparent hover:opacity-80 active:scale-95';

	return (
		<main className='min-h-screen bg-amber-100'>
			{type === 'countries' && <Countries />}
			{type === 'weapons' && <Weapons />}
			{type === 'brand' && <Brands />}

			<div className='fixed right-4 bottom-0 rounded-t-3xl bg-white p-4 pt-2 shadow'>
				<div className='flex flex-col gap-1'>
					<button title='Países' className={classBtn} onClick={() => setType('countries')}>
						<BiWorld size={30} />
					</button>
					<button title='Marcas' className={classBtn} onClick={() => setType('brand')}>
						<TbBrandSublimeText size={30} />
					</button>
					<button title='Armas' className={classBtn} onClick={() => setType('weapons')}>
						<GiPistolGun size={30} />
					</button>
				</div>
			</div>
		</main>
	);
}
