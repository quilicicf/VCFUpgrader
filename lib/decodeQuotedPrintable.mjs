import utf8 from '../node_modules/utf8/utf8.js';
import quotedPrintable from '../node_modules/quoted-printable/quoted-printable.js';

export default (encoded) => utf8.decode(quotedPrintable.decode(encoded));
