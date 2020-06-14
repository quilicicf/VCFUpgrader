# VCFUpgrader

A tool to upgrade VCards from v2.1 to v4

## What is this?

A tool I created to migrate the VCard export from my old phone so it was importable in the new.

I couldn't find a satisfying open-source solution to do that unfortunately.

## Disclaimer

This is a tool I wrote in a dash and it does not support the whole specification (far from it). If your VCard file only contains fields in the following list you should be pretty safe:

* N
* FN
* ADR
* TEL
* ORG
* EMAIL
* PHOTO

Otherwise, I can't guarantee anything will work.

## How to use it?

```shell
git clone https://github.com/quilicicf/VCFUpgrade.git
cd VCFUpgrade
npm ci
node ./index.js /path/to/inputFile.vcf /path/to/outputFile.vcf
```
