#!/bin/sh

set -eu



gen_china_list()
{

    OUTPUT=output.txt
    BASE=https://cdn.jsdelivr.net/gh/felixonmars/dnsmasq-china-list

    echo '' > $OUTPUT
    curl -sSL $BASE/apple.china.conf >> $OUTPUT
    # curl -sSL $BASE/google.china.conf >> $OUTPUT
    curl -sSL $BASE/accelerated-domains.china.conf >> $OUTPUT

    mkdir -p dump
    awk -F '/' 'NF {print $2}' $OUTPUT | node gen.js > dump/china-list.bin

}



cd $1 && shift && "$@"

