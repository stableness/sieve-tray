const { readFileSync } = require('fs');

const { getDomain } = require('tldts');

const { BloomFilter } = require('bloomxx-fork');

const dump = readFileSync('../json/china-list.bin');




const filter = new BloomFilter(dump);



/**
 * @param {string} domain - domain to check
 * @return {boolean} result
 */
module.exports.has = function (domain) {
    return Boolean(domain) ? filter.has(getDomain(domain) || domain) : false;
};

