import puppeteer from 'puppeteer';

const puppeteerPromise = new Promise(async (resolve) => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.setViewport({ width: 500, height: 100, isMobile: true, isLandscape: true });

	const { VERCEL_URL: URL = 'http://localhost:3000' } = process.env;

	await page.goto(`${URL}/resume?pdf=true`, {
		waitUntil: 'networkidle2',
	});

	const buffer = await page.pdf({ format: 'A3' });

	await browser.close();

	resolve(buffer);
});

export default async (_req: any, res: any) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/pdf');
	res.end(await puppeteerPromise);
};
