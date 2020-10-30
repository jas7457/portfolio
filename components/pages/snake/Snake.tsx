import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function Snake() {
	const [state, setState] = useState(initialState);
	const { rows, columns, snake, direction, food } = state;

	const boardRef = useRef<HTMLDivElement>(null);

	const { rowBlocks, columnBlocks } = useMemo(() => {
		return {
			rowBlocks: Array.from({ length: rows }, (_, index) => index),
			columnBlocks: Array.from({ length: columns }, (_, index) => index),
		};
	}, [rows, columns]);

	// focus the board at the start so the keyboard keys are registered
	useEffect(() => {
		boardRef.current?.focus();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setState((state) => ({ ...state, food: [2, 4] }));
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setState((state) => {
				const { snake, direction } = state;

				const snakeCopy = [...snake];
				const head = [...snakeCopy[0]];
				snakeCopy.pop();

				const newHead: [number, number] = (() => {
					switch (direction) {
						case 'up':
							return [head[0] - 1, head[1]];
						case 'down':
							return [head[0] + 1, head[1]];
						case 'left':
							return [head[0], head[1] - 1];
						case 'right':
							return [head[0], head[1] + 1];
					}
				})() as [number, number];

				// cycle the snake through if it goes out of bounds
				if (newHead[0] < 0) {
					newHead[0] = rows - 1;
				}

				if (newHead[0] >= rows) {
					newHead[0] = 0;
				}

				if (newHead[1] < 0) {
					newHead[1] = columns - 1;
				}

				if (newHead[1] >= columns) {
					newHead[1] = 0;
				}

				snakeCopy.unshift(newHead);

				return { ...state, snake: snakeCopy };
			});
		}, 100);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			ref={boardRef}
			className="grid h-screen mx-auto"
			style={{ width: '100vh', gridTemplate: `repeat(${rows}, 1fr) / repeat(${columns}, 1fr)` }}
			onKeyDown={(e) => {
				switch (e.key) {
					case 'ArrowUp':
						setState({ ...state, direction: 'up' });
						break;
					case 'ArrowDown':
						setState({ ...state, direction: 'down' });
						break;
					case 'ArrowLeft':
						setState({ ...state, direction: 'left' });
						break;
					case 'ArrowRight':
						setState({ ...state, direction: 'right' });
						break;
				}
			}}
			tabIndex={0}
		>
			{rowBlocks.map((_, rowIndex) => {
				return columnBlocks.map((_, columnIndex) => {
					const fill = (() => {
						const hasSnake = snake.find((s) => s[0] === rowIndex && s[1] === columnIndex);
						if (hasSnake) {
							return 'snake';
						}

						if (food && food[0] === rowIndex && food[1] === columnIndex) {
							return 'food';
						}

						return 'block';
					})();

					return <Block key={`${rowIndex}.${columnIndex}`} rows={rows} columns={columns} fill={fill} />;
				});
			})}
		</div>
	);
}

function Block({ rows, columns, fill }: { rows: number; columns: number; fill: 'snake' | 'food' | 'block' }) {
	const color = (() => {
		switch (fill) {
			case 'snake':
				return 'bg-green-800';
			case 'block':
				return 'bg-green-400';
			case 'food':
				return 'bg-red-800';
		}
	})();

	return (
		<div
			className={clsx(color, 'border border-gray-600')}
			style={{ height: `calc(100vh / ${rows})`, width: `calc(100vh / ${columns})` }}
		/>
	);
}

const initialState = {
	rows: 40,
	columns: 40,
	snake: [[20, 20]] as Array<[number, number]>,
	direction: 'left' as 'left' | 'right' | 'up' | 'down',
	food: undefined as undefined | [number, number],
} as const;
