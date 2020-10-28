import puppeteer from 'puppeteer';

const puppeteerPromise = new Promise(async (resolve) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({ width: 500, height: 100, isMobile: true, isLandscape: true });
	//await page.setViewport({ width: 1680, height: 1050 });

	await page.goto('http://localhost:3000?pdf=true', {
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
