const migrateUrlPhotoLine = (line) => {
  const url = line.split(':')[ 1 ];
  return `PHOTO:${url}`;
};

const getMediaType = (line) => {
  if (line.includes('JPG')) { return 'image/jpg'; }
  if (line.includes('JPEG')) { return 'image/jpeg'; }
  if (line.includes('PNG')) { return 'image/png'; }
  throw Error(`Unknown image format for ${line}. Add support for it in lib/migratePhotoLine.js`);
};

const migrateBase64PhotoLine = (line) => {
  const startOfBase64Photo = line.split(':')[ 1 ];
  const mediaType = getMediaType(line);
  return `PHOTO:data:${mediaType};base64,${startOfBase64Photo}`;
};

export default (line) => {
  return line.includes('ENCODING=')
    ? migrateBase64PhotoLine(line)
    : migrateUrlPhotoLine(line);
};
