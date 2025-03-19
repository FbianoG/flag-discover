'use client';

import Countries from '@/components/shared/Countries';
import Weapons from '@/components/shared/Weapons';
import { useEffect, useState } from 'react';
import Brands from '@/components/shared/Brands';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/shared/Footer';

export default function Home() {
	const [type, setType] = useState<'countries' | 'weapons' | 'brand'>();

	const [start, setStart] = useState<boolean>(false);

	const initialize = () => {
		if (!type) return;
		setStart(true);
	};

	useEffect(() => {
		if (!start) setType(undefined);
	}, [start]);

	return (
		<main className='relative bg-slate-900 bg-[url(/img/background.jpg)] animate-scroll-bg bg-cover bg-center'>
			<div className='absolute inset-0 bg-black/50  '></div>
			<div className='relative z-10 grid min-h-screen'>
				{!start && (
					<section className='py-16 md:py-32'>
						<div className='mx-auto max-w-5xl px-6'>
							<div className='text-center'>
								<h2 className='text-4xl font-semibold text-balance text-slate-400 lg:text-5xl'>Flags Discover</h2>
								<p className='mt-4 mb-12 text-slate-300'>Descubra todas as bandeiras do mundo e mais um pouco sobre elas.</p>

								<select defaultValue='' onChange={(e) => setType(e.target.value as typeof type)} className='border-b text-slate-300'>
									<option value='' disabled selected>
										Modo de jogo
									</option>
									<option value='countries'>Países</option>
									<option value='brand'>Marcas</option>
									<option value='weapons'>Armas</option>
								</select>

								<div className='mt-12 flex flex-wrap justify-center gap-4'>
									<Button size='lg' onClick={initialize}>
										Descobrir
									</Button>

									<Button size='lg' variant='outline'>
										Sobre Nós
									</Button>
								</div>
							</div>
						</div>
					</section>
				)}
				{start && type && (
					<>
						<button
							title='Voltar'
							onClick={() => setStart(false)}
							className='fixed top-4 right-4 cursor-pointer rounded-full bg-white p-2 shadow duration-300 hover:bg-neutral-50 active:scale-95'>
							<ArrowLeft size={30} />
						</button>
						{type === 'countries' && <Countries />}
						{type === 'weapons' && <Weapons />}
						{type === 'brand' && <Brands />}
					</>
				)}

				<Footer />
			</div>
		</main>
	);
}
