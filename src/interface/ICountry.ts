export interface ICountry {
	code: string;
	name: string;
	details: {
		population: number;
		area: number;
		gdp: number;
		capital: string;
		continent: string;
		description: string;
	};
}
