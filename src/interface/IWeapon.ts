export interface IWeapon {
	code: string;
	name: string;
	details: {
		manufacturer: string;
		type: string;
		country: string;
		caliber: string;
		capacity: number;
		weight: number;
		description: string;
	};
}
