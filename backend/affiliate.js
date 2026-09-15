const crypto = require('crypto');
const axios = require('axios');

/**
 * SHOPEE AFFILIATE — generate link
 * Docs: https://open.shopee.com
 */
async function shopeeLink(originUrl, subId = 'smartshop') {
  const appId = process.env.SHOPEE_APP_ID;
  const secret = process.env.SHOPEE_APP_SECRET;
  if (!appId || !secret) return null;

  const path = '/api/v2/affiliate/generate_short_link';
  const timestamp = Math.floor(Date.now() / 1000);
  const payload = JSON.stringify({ originUrl, subIds: [subId] });
  const sign = crypto.createHash('sha256')
    .update(appId + path + timestamp + payload + secret).digest('hex');

  try {
    const { data } = await axios.post('https://open-api.affiliate.shopee.co.id' + path,
      JSON.parse(payload), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `SHA256 Credential=${appId}, Timestamp=${timestamp}, Signature=${sign}`
        }
      });
    return data?.data?.shortLink || null;
  } catch (e) {
    console.error('Shopee affiliate error:', e.response?.data || e.message);
    return null;
  }
}

/**
 * LAZADA AFFILIATE
 * Docs: https://open.lazada.com
 */
async function lazadaLink(originUrl) {
  const key = process.env.LAZADA_APP_KEY;
  const secret = process.env.LAZADA_APP_SECRET;
  if (!key || !secret) return null;

  const timestamp = Date.now().toString();
  const apiPath = '/marketing/affiliate/link';
  const params = { url: originUrl, timestamp };
  const signBase = Object.keys(params).sort().map(k => k + params[k]).join('');
  const sign = crypto.createHmac('sha256', secret).update(apiPath + signBase).digest('hex');

  try {
    const { data } = await axios.get('https://api.lazada.co.id/rest' + apiPath, {
      params: { ...params, app_key: key, sign_method: 'sha256', sign }
    });
    return data?.data?.link || null;
  } catch (e) {
    console.error('Lazada affiliate error:', e.response?.data || e.message);
    return null;
  }
}

/**
 * Auto-detect platform & generate link
 */
async function generateAffiliateLink(url) {
  if (!url) return url;
  const host = new URL(url).hostname.toLowerCase();
  if (host.includes('shopee'))   return await shopeeLink(url) || url;
  if (host.includes('lazada'))   return await lazadaLink(url) || url;
  // Tokopedia: afiliasi via TikTok Shop (belum API publik umum)
  return url;
}

module.exports = { generateAffiliateLink, shopeeLink, lazadaLink };