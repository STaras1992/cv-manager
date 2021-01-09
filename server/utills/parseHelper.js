const fileTypeReg = /(?:\.([^.]+))?$/;

exports.parseAllCvItemsResponse = (items) => {
  let parsedItems = [];

  parsedItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    file: item.file,
    type: item.type,
  }));

  return parsedItems;
};

exports.parseSelectedFileResponse = (item) => {
  return { id: item.id, name: item.name, description: item.description, type: item.type, file: item.file };
};

exports.fileTypeFromName = (fileName) => {
  return fileTypeReg.exec(fileName)[1];
};

exports.bucketKeyCreator = (name, id, type) => {
  return `${name}.${id}.${type}`;
};
