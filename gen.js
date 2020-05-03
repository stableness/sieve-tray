const { createInterface } = require('readline');

const { getDomain } = require('tldts');

const { BloomFilter } = require('bloomxx');



const wrap = process.env.DOMAIN ? getDomain : v => v;

const store = new Set();

const table = createInterface({
    input: process.stdin,
    terminal: false,
});

table

    .on('line', line => {
        line = (line || '').trim();
        store.add(wrap(line) || line);
    })

    .once('close', () => {

        const filter = BloomFilter.createOptimal(store.size, 0.01);

        filter.add(Array.from(store));

        process.stdout.write(filter.toBuffer());

    })

;

