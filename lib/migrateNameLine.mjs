import decodeQuotedPrintable from './decodeQuotedPrintable.mjs';

export default (line) => {
  const name = line.split(':')[ 1 ];
  const namePart = line.includes('QUOTED-PRINTABLE') ? decodeQuotedPrintable(name) : name;
  return `N:${namePart}`;
};
