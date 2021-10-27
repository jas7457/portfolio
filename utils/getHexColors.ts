export type Colors = 'blue' | 'yellow' | 'gray' | 'teal' | 'red' | 'transparent';

export function getHex(color: Colors): string {
	return {
		blue: '#38BDF8',
		yellow: '#F9AE00',
		gray: '#333',
		teal: '#7CADAA',
		red: '#D54836',
		transparent: 'transparent',
	}[color];
}
