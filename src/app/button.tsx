/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

interface Props {
	code: string;
	title: string;
	index: number;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setRight: React.Dispatch<React.SetStateAction<number>>;
	setWrong: React.Dispatch<React.SetStateAction<number>>;
	pastContries: { code: string; country: string }[];
	setPastContries: React.Dispatch<React.SetStateAction<{ code: string; country: string }[]>>;
	contry: { code: string; country: string } | undefined;
	selectContry: () => void;
}

const Button = ({ code, title, index, loading, setLoading, setRight, setWrong, setPastContries, pastContries, contry, selectContry }: Props) => {
	const [bgColor, setBgColor] = useState<string>();

	return (
		<button
			disabled={loading}
			className='flex h-[70px] w-[350px] cursor-pointer overflow-hidden rounded bg-white shadow duration-300 hover:scale-[1.02] hover:ring'
			onClick={() => {
				if (loading) return;

				if (code === contry?.code) {
					setRight((right) => right + 1);
					setBgColor('bg-emerald-400');

					const audio = new Audio('/audio/check.mp3');
					audio.play();
				} else {
					setWrong((wrong) => wrong + 1);
					setBgColor('bg-red-400');
                    const audio = new Audio('/audio/wrong.mp3');
					audio.play();
				}
				setLoading(true);
				setPastContries([...pastContries, contry as { code: string; country: string }]);
				setTimeout(() => {
					selectContry();
				}, 400);
			}}>
			<div className={`grid h-full w-[50px] place-items-center ${bgColor || 'bg-blue-400'} text-xl font-medium text-white`}>{index}</div>
			<p className='text-primary grid h-full flex-1 place-items-center text-lg'>{title}</p>
		</button>
	);
};

export default Button;
