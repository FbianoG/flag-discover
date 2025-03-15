export interface IBrand {
	code: string;
	name: string;
	details: {
		description: string;
		year: number;
		segment: string;
		country: string;
	};
}