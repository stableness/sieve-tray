const [ lib, domain ] = process.argv.slice(2);



switch (lib) {

    case 'china':
        console.log(require('../lib/china-list').has(domain));
        break;

    case 'block':
        console.log(require('../lib/block-list').has(domain));
        break;

    default:
        console.error('Unknown: '.concat(lib));

}

