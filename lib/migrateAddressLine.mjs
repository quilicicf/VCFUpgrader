import decodeQuotedPrintable from './decodeQuotedPrintable.mjs';

export default (line) => {
  const address = line.split(':')[ 1 ];
  const addressPart = line.includes('QUOTED-PRINTABLE') ? decodeQuotedPrintable(address) : address;
  return `ADR:${addressPart}`;
};
