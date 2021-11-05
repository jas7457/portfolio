import Image from 'next/image';
import Link from 'next/link';
import React, { HTMLAttributeAnchorTarget } from 'react';
import { BiLayout } from 'react-icons/bi';
import { FaCity, FaPhone } from 'react-icons/fa';
import { GoMail } from 'react-icons/go';

import DarkModeButton from '@app/components/DarkModeButton';

import type { IconType } from 'react-icons';

export default function Header({ isPDF }: { isPDF: boolean }) {
	return (
		<header className="flex flex-col md:flex-row items-center py-4 mb-4 border-b-2 text-center md:text-left space-y-4 md:space-y-0 md:space-x-4">
			<Image src="/profile.jpg" alt="Jason Addleman" className="rounded-full" width={96} height={96} priority />

			<div className="flex-grow">
				<h1 className="text-4xl text-primary leading-none mb-1">Jason Addleman</h1>
				<h2 className="text-xl leading-none">Front End Engineering Manager focused on React and TypeScript</h2>

				{process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' && !isPDF && (
					<Link href="/api/downloadResume">
						<a className="mt-2 px-2 py-1 inline-block rounded-lg bg-primary text-white">Download as PDF</a>
					</Link>
				)}
			</div>

			<div className="flex-shrink-0 space-y-1">
				<HeaderInfo Icon={GoMail} href="mailto:jas7457@gmail.com" title="Email Jason">
					jas7457@gmail.com
				</HeaderInfo>

				<HeaderInfo Icon={FaPhone} href="tel:+7176584499" title="Call Jason">
					(717) 658-4499
				</HeaderInfo>
				<HeaderInfo
					Icon={FaCity}
					href="https://www.google.com/maps/place/Pittsburgh,+PA/@40.4313473,-80.0505399,12z/data=!3m1!4b1!4m5!3m4!1s0x8834f16f48068503:0x8df915a15aa21b34!8m2!3d40.4406248!4d-79.9958864"
					target="_blank"
				>
					Pittsburgh, PA
				</HeaderInfo>

				<HeaderInfo Icon={BiLayout} href={process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_HOST ?? '/'}>
					Portfolio
				</HeaderInfo>

				{!isPDF && <DarkModeButton />}
			</div>
		</header>
	);
}

function HeaderInfo({
	Icon,
	children,
	title,
	href,
	target = '_self',
}: {
	Icon: IconType;
	href: string;
	target?: string;
	title?: HTMLAttributeAnchorTarget;
	children: string;
}) {
	return (
		<a href={href} target={target} className="flex items-center justify-center md:justify-start" title={title}>
			<Icon className="mr-2" /> {children}
		</a>
	);
}
