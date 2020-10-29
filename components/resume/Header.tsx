import React from 'react';
import Image from 'next/image';
import { GoMail } from 'react-icons/go';
import { FaCity, FaPhone } from 'react-icons/fa';

import type { IconType } from 'react-icons';

export default function Header() {
	return (
		<header className="flex items-center py-4 mb-4 border-b-2 flex-col text-center space-y-4 md:space-y-0 md:space-x-4 md:flex-row md:text-left">
			<Image src="/profile.jpg" alt="Jason Addleman" className="rounded-full" width={96} height={96} priority />

			<div className="flex-grow">
				<h1 className="text-4xl text-blue-600 leading-none mb-1">Jason Addleman</h1>
				<h2 className="text-xl leading-none">Full-Stack Developer focused on React and SPAs</h2>
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
				>
					Pittsburgh, PA
				</HeaderInfo>
			</div>
		</header>
	);
}

function HeaderInfo({
	Icon,
	children,
	title,
	href,
}: {
	Icon: IconType;
	href: string;
	title?: string;
	children: string;
}) {
	return (
		<a href={href} className="flex items-center justify-center md:justify-start" title={title}>
			<Icon className="mr-2" /> {children}
		</a>
	);
}
