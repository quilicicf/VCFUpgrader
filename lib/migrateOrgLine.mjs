import decodeQuotedPrintable from './decodeQuotedPrintable.mjs';

export default (line) => {
  const org = line.split(':')[ 1 ];
  const orgPart = line.includes('QUOTED-PRINTABLE') ? decodeQuotedPrintable(org) : org;
  return `ORG:${orgPart}`;
};
