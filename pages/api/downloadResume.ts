import puppeteer from 'puppeteer';

import type { NextApiRequest, NextApiResponse } from 'next';

const puppeteerPromise = new Promise(async (resolve) => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.setViewport({ width: 500, height: 100, isMobile: true, isLandscape: true });

	const { VERCEL_URL: URL = 'http://localhost:3000' } = process.env;

	await page.goto(`${URL}/resume?pdf=true`, {
		waitUntil: 'networkidle2',
	});

	const buffer = await page.pdf({ format: 'a3' });

	await browser.close();

	resolve(buffer);
});

export default async (_req: NextApiRequest, res: NextApiResponse) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/pdf');
	res.end(await puppeteerPromise);
};
