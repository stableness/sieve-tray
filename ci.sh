#!/bin/sh

set -eu



gen_china_list()
{

    OUTPUT=output.txt
    BASE=https://cdn.jsdelivr.net/gh/felixonmars/dnsmasq-china-list

    echo '' > $OUTPUT.raw
    curl -sSL $BASE/apple.china.conf >> $OUTPUT.raw
    curl -sSL $BASE/google.china.conf >> $OUTPUT.raw
    curl -sSL $BASE/accelerated-domains.china.conf >> $OUTPUT.raw

    awk -F '/' 'NF {print $2}' $OUTPUT.raw | sort -b -f | uniq -i > $OUTPUT

    mkdir -p json
    cat $OUTPUT | node gen.js > json/china-list.json

}



cd $1 && shift && "$@"

