import React from 'react';
import clsx from 'clsx';
import {
	SiJavascript,
	SiTypescript,
	SiReact,
	SiHtml5,
	SiNodedotjs,
	SiCss3,
	SiMongodb,
	SiNextdotjs,
	SiGraphql,
	SiTailwindcss,
	SiGit,
	SiGithub,
	SiJenkins,
	SiWebstorm,
	SiJira,
	SiConfluence,
	SiSass,
	SiJquery,
	SiEmberdotjs,
	SiJest,
	SiMocha,
	SiVisualstudiocode,
	SiStyledcomponents,
	SiShopify,
} from 'react-icons/si';
import { DiBackbone } from 'react-icons/di';

import { Marionette, Express, Koa, Hapi } from '@app/components/CustomIcons';

import type { IconType } from 'react-icons/lib';

export default function Tech(props: Omit<TechProps, 'color'> & { color?: TechProps['color'] }) {
	const { name, Icon, color, className, iconClassName, isSelected = false } = props;

	return (
		<div className={clsx(className, 'px-2', getTechClasses(isSelected))}>
			<Icon className={clsx('mr-1', iconClassName, color)} /> {name}
		</div>
	);
}

export function getTechClasses(isSelected: boolean) {
	return clsx('inline-flex items-center py-1 rounded-full border-2 border-transparent', {
		'dark:bg-gray-800': !isSelected,
		'bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800': isSelected,
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
	color: string;
	type: 'language' | 'framework' | 'database' | 'software';
}

// a bunch of cruft just so the objects are correctly typed as TechObjects and the keys for TechMap are found dynamically
// by what's inside of the object. Oh, TypeScript :( - https://stackoverflow.com/questions/64119527/typescript-create-typed-record-without-explicitly-defining-the-keys/64128396#64128396
type EvaluateType<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type TechType<T extends Record<string, TechObject>> = EvaluateType<{ [key in keyof T]: TechObject }>;
const createTech = <T extends Record<string, TechObject>>(tech: T) => tech;

const techLookup = createTech({
	TypeScript: {
		name: 'TypeScript',
		type: 'language',
		Icon: SiTypescript,
		color: 'text-tech-typescript',
	},
	JavaScript: {
		name: 'JavaScript',
		type: 'language',
		Icon: SiJavascript,
		color: 'text-tech-javascript',
	},
	HTML: {
		name: 'HTML',
		type: 'language',
		Icon: SiHtml5,
		color: 'text-tech-html',
	},
	CSS: {
		name: 'CSS',
		type: 'language',
		Icon: SiCss3,
		color: 'text-tech-css',
	},
	SASS: {
		name: 'SCSS',
		type: 'language',
		Icon: SiSass,
		color: 'text-tech-scss',
	},
	Node: {
		name: 'Node',
		type: 'language',
		Icon: SiNodedotjs,
		color: 'text-tech-node',
	},
	React: {
		name: 'React',
		type: 'framework',
		Icon: SiReact,
		color: 'text-tech-react',
	},
	Next: {
		name: 'Next.js',
		type: 'framework',
		Icon: SiNextdotjs,
		color: 'text-tech-next',
	},
	Tailwind: {
		name: 'Tailwind CSS',
		type: 'framework',
		Icon: SiTailwindcss,
		color: 'text-tech-tailwind',
	},
	Jest: {
		name: 'Jest',
		type: 'framework',
		Icon: SiJest,
		color: 'text-tech-jest',
	},
	Mocha: {
		name: 'mocha',
		type: 'framework',
		Icon: SiMocha,
		color: 'text-tech-mocha',
	},
	Ember: {
		name: 'Ember.js',
		type: 'framework',
		Icon: SiEmberdotjs,
		color: 'text-tech-ember',
	},
	JQuery: {
		name: 'jQuery',
		type: 'framework',
		Icon: SiJquery,
		color: 'text-tech-jquery',
	},
	Backbone: {
		name: 'Backbone.js',
		type: 'framework',
		Icon: DiBackbone,
		color: 'text-tech-backbone',
	},
	Marionette: {
		name: 'Marionette',
		type: 'framework',
		Icon: Marionette,
		color: 'text-tech-marionette',
	},
	StyledComponents: {
		name: 'styled components',
		type: 'framework',
		Icon: SiStyledcomponents,
		color: 'text-tech-styledcomponents',
	},
	GraphQL: {
		name: 'GraphQL',
		type: 'database',
		Icon: SiGraphql,
		color: 'text-tech-graphql',
	},
	Koa: {
		name: 'Koa',
		type: 'database',
		Icon: Koa,
		color: 'text-tech-koa',
	},
	Express: {
		name: 'Express',
		type: 'database',
		Icon: Express,
		color: 'text-tech-express',
	},
	Hapi: {
		name: 'Hapi',
		type: 'database',
		Icon: Hapi,
		color: 'text-tech-hapi',
	},
	Mongo: {
		name: 'Mongo DB',
		type: 'database',
		Icon: SiMongodb,
		color: 'text-tech-mongo',
	},

	Git: {
		name: 'Git',
		type: 'software',
		Icon: SiGit,
		color: 'text-tech-git',
	},
	GitHub: {
		name: 'GitHub',
		type: 'software',
		Icon: SiGithub,
		color: 'text-tech-github',
	},
	WebStorm: {
		name: 'WebStorm',
		type: 'software',
		Icon: SiWebstorm,
		color: 'text-tech-webstorm',
	},
	VisualStudioCode: {
		name: 'VS Code',
		type: 'software',
		Icon: SiVisualstudiocode,
		color: 'text-tech-vscode',
	},
	Jenkins: {
		name: 'Jenkins',
		type: 'software',
		Icon: SiJenkins,
		color: 'text-tech-jenkins',
	},
	JIRA: {
		name: 'JIRA',
		type: 'software',
		Icon: SiJira,
		color: 'text-tech-jira',
	},
	Confluence: {
		name: 'Confluence',
		type: 'software',
		Icon: SiConfluence,
		color: 'text-tech-confluence',
	},
	Shopify: {
		name: 'Shopify',
		type: 'software',
		Icon: SiShopify,
		color: 'text-tech-shopify',
	},
});

export const TechMap: TechType<typeof techLookup> = techLookup;
