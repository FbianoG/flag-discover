import { ICountry } from '@/interface/ICountry';
import { create } from 'zustand';

type State = {
	countries: ICountry[];
	setCountries: (countries: ICountry[]) => void;
	country: ICountry | undefined;
	setCountry: (country: ICountry) => void;
	pastCountries: ICountry[];
	setPastCountries: (pastCountries: ICountry) => void;
	optionsCountries: ICountry[];
	setOptionsCountries: (optionsCountries: ICountry[]) => void;
};

const useCountriesStore = create<State>((set) => ({
	countries: [],
	setCountries: (countries) => set({ countries }),
	country: undefined,
	setCountry: (country) => set({ country }),
	pastCountries: [],
	setPastCountries: (country) => set((state) => ({ pastCountries: [...state.pastCountries, country] })),
	optionsCountries: [],
	setOptionsCountries: (optionsCountries) => set({ optionsCountries }),
}));

export default useCountriesStore;
