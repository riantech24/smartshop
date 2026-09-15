const { Cluster } = require('puppeteer-cluster');

const SELECTORS = {
  'shopee.co.id': ['div[class*="pqTWkA"]', 'div[class*="price"]'],
  'tokopedia.com': ['div[data-testid="lblPDPDetailProductPrice"]', 'span[class*="price"]'],
  'lazada.co.id': ['span[class*="pdp-price"]', '.pdp-price'],
  'bukalapak.com': ['div[class*="product-price"]'],
  'blibli.com': ['div[class*="product-price"]']
};

async function scrapePrice(url) {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 2,
    timeout: 60000,
    puppeteerOptions: {
      headless: 'new',
      args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage']
    }
  });

  let result = { price: null, title: null };

  await cluster.task(async ({ page, data: url }) => {
    try {
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36');
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await new Promise(r => setTimeout(r, 2500));

      const host = new URL(url).hostname.replace('www.','');
      const sels = Object.entries(SELECTORS).find(([k]) => host.includes(k))?.[1] || [];

      for (const sel of sels) {
        const el = await page.$(sel);
        if (el) {
          const txt = await page.evaluate(e => e.textContent, el);
          const num = parseInt(txt.replace(/[^0-9]/g,''), 10);
          if (num > 100) { result.price = num; break; }
        }
      }

      // Ambil judul
      const titleEl = await page.$('h1');
      if (titleEl) result.title = await page.evaluate(e => e.textContent.trim(), titleEl);
    } catch (e) {
      console.error('Scrape error:', e.message);
    }
  });

  await cluster.queue(url);
  await cluster.idle();
  await cluster.close();
  return result;
}

module.exports = { scrapePrice };

// CLI test: node scraper.js <url>
if (require.main === module) {
  const url = process.argv[2];
  if (!url) { console.log('Usage: node scraper.js <url>'); process.exit(1); }
  scrapePrice(url).then(r => console.log(JSON.stringify(r, null, 2)));
}