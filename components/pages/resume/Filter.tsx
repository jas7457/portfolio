import React from 'react';
import clsx from 'clsx';

import type { TechObject } from './Tech';

export default function Filter(props: FilterProps) {
	const { items, onFilterClick } = props;

	return (
		<div className="space-x-2">
			{items.map((item) => {
				const Icon = item.Icon;
				return (
					<button
						key={item.name}
						className={clsx(
							'inline-flex items-center py-1 px-5 rounded-full mt-2 border-2 outline-none focus:outline-none focus:shadow-outline',
							item.isSelected
								? 'bg-gray-900 text-white border-transparent'
								: 'border-2 border-gray-400 shadow hover:bg-gray-900 hover:text-white hover:border-transparent'
						)}
						onClick={() => onFilterClick(item)}
					>
						<Icon color={item.color} className="mr-1" /> {item.name}
					</button>
				);
			})}
		</div>
	);
}

interface FilterProps {
	items: Array<TechObject & { isSelected: boolean }>;
	onFilterClick: (item: FilterProps['items'][number]) => void;
}
