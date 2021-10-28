export type Colors = 'blue' | 'yellow' | 'gray' | 'teal' | 'red' | 'green' | 'transparent';

export default function getHexColor(color: Colors): string {
	return {
		blue: '#38BDF8',
		yellow: '#F9AE00',
		gray: '#333',
		teal: '#7CADAA',
		red: '#D54836',
		green: '#4ADE80',
		transparent: 'transparent',
	}[color];
}
