const { getDomain } = require('tldts');

const { BloomFilter } = require('bloom-filters');

const dump = require('../json/china-list.json');





const filter = BloomFilter.fromJSON(dump);



/**
 * @param {string} domain - domain to check
 * @return {boolean} result
 */
module.exports.has = function (domain) {
    return Boolean(domain) ? filter.has(getDomain(domain) || domain) : false;
};

