const { resolve } = require('path');
const { readFileSync } = require('fs');

const { getDomain } = require('tldts');

const { BloomFilter } = require('@stableness/bloomxx');





const filter = new BloomFilter(
    readFileSync(resolve(__dirname, '../dump/china-list.bin')),
);





/**
 * @param {string} domain - domain to check
 * @return {boolean} result
 */
module.exports.has = function (domain) {
    return Boolean(domain) ? filter.has(getDomain(domain) || domain) : false;
};

