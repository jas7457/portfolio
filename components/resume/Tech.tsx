import React from 'react';
import clsx from 'clsx';
import {
	SiJavascript,
	SiTypescript,
	SiReact,
	SiHtml5,
	SiNodeDotJs,
	SiCss3,
	SiMongodb,
	SiNextDotJs,
	SiGraphql,
	SiTailwindcss,
	SiGit,
	SiGithub,
	SiJenkins,
	SiWebstorm,
	SiJira,
	SiConfluence,
	SiSass,
} from 'react-icons/si';
import { DiBackbone } from 'react-icons/di';

import { Marionette, Express, Koa, Hapi } from '../CustomIcons';

import type { IconType } from 'react-icons/lib';

export default function Tech(props: TechProps) {
	const { name, Icon, color, className, iconClassName, isSelected = false } = props;

	return (
		<div className={clsx(className, 'px-2', getTechClasses(isSelected))}>
			<Icon color={color} className={clsx('mr-1', iconClassName)} /> {name}
		</div>
	);
}

export function getTechClasses(isSelected: boolean) {
	return clsx('inline-flex items-center py-1 rounded-full border-2 border-transparent', {
		'bg-gray-700 text-white': isSelected,
	});
}

interface TechProps extends TechObject {
	className?: string;
	isSelected?: boolean;
	iconClassName?: string;
}

export interface TechObject {
	name: string;
	Icon: IconType;
	color: string | undefined;
	type: 'language' | 'framework' | 'database' | 'software';
}

// a bunch of cruft just so the objects are correctly typed as TechObjects and the keys for TechMap are found dynamically
// by what's inside of the object. Oh, TypeScript :( - https://stackoverflow.com/questions/64119527/typescript-create-typed-record-without-explicitly-defining-the-keys/64128396#64128396
type EvaluateType<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type TechType<T extends Record<string, TechObject>> = EvaluateType<{ [key in keyof T]: TechObject }>;
const createTech = <T extends Record<string, TechObject>>(tech: T) => tech;

const techLookup = createTech({
	JavaScript: {
		name: 'JavaScript',
		type: 'language',
		Icon: SiJavascript,
		color: '#efd81d',
	},
	TypeScript: {
		name: 'TypeScript',
		type: 'language',
		Icon: SiTypescript,
		color: '#2d79c7',
	},
	HTML: {
		name: 'HTML',
		type: 'language',
		Icon: SiHtml5,
		color: '#dd4b25',
	},
	CSS: {
		name: 'CSS',
		type: 'language',
		Icon: SiCss3,
		color: '#1a6fb4',
	},
	SASS: {
		name: 'SCSS',
		type: 'language',
		Icon: SiSass,
		color: '#c76494',
	},
	Node: {
		name: 'Node',
		type: 'language',
		Icon: SiNodeDotJs,
		color: '#6ea55f',
	},
	React: {
		name: 'React',
		type: 'framework',
		Icon: SiReact,
		color: '#5ed3f3',
	},
	Next: {
		name: 'Next.js',
		type: 'framework',
		Icon: SiNextDotJs,
		color: '#000',
	},
	Tailwind: {
		name: 'Tailwind CSS',
		type: 'framework',
		Icon: SiTailwindcss,
		color: '#14b4c6',
	},
	Backbone: {
		name: 'Backbone.js',
		type: 'framework',
		Icon: DiBackbone,
		color: '#0071b5',
	},
	Marionette: {
		name: 'Marionette',
		type: 'framework',
		Icon: Marionette,
		color: '#ce2227',
	},

	Koa: {
		name: 'Koa',
		type: 'database',
		Icon: Koa,
		color: '#000',
	},
	Express: {
		name: 'Express',
		type: 'database',
		Icon: Express,
		color: '#000',
	},
	Hapi: {
		name: 'Hapi',
		type: 'database',
		Icon: Hapi,
		color: '#000',
	},
	Mongo: {
		name: 'Mongo DB',
		type: 'database',
		Icon: SiMongodb,
		color: '#50a64a',
	},
	GraphQL: {
		name: 'GraphQL',
		type: 'database',
		Icon: SiGraphql,
		color: '#E535AB',
	},

	Git: {
		name: 'Git',
		type: 'software',
		Icon: SiGit,
		color: '#eb4d28',
	},
	GitHub: {
		name: 'GitHub',
		type: 'software',
		Icon: SiGithub,
		color: '#1a1e22',
	},
	WebStorm: {
		name: 'WebStorm',
		type: 'software',
		Icon: SiWebstorm,
		color: '#1a1e22',
	},
	Jenkins: {
		name: 'Jenkins',
		type: 'software',
		Icon: SiJenkins,
		color: '#cc3631',
	},
	JIRA: {
		name: 'JIRA',
		type: 'software',
		Icon: SiJira,
		color: '#2580f7',
	},
	Confluence: {
		name: 'Confluence',
		type: 'software',
		Icon: SiConfluence,
		color: '#2680f5',
	},
});

export const TechMap: TechType<typeof techLookup> = techLookup;
