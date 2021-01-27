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

exports.parseSingleCvResponse = (item) => {
  return { id: item.id, name: item.name, description: item.description, type: item.type, file: item.file };
};

exports.parseAllCoversResponse = (items) => {
  let parsedItems = [];

  parsedItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    content: item.content,
    direction: item.direction,
  }));

  return parsedItems;
};

exports.parseCoverResponse = (item) => {
  return { id: item.id, name: item.name, content: item.content, direction: item.direction };
};

exports.parseAllTemplatesResponse = (items) => {
  let parsedItems = [];

  parsedItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    cv: item.cv,
    cover: item.cover,
  }));

  return parsedItems;
};

exports.parseTemplateResponse = (item) => {
  return { id: item.id, name: item.name, description: item.description, cv: item.cv, cover: item.cover };
};

exports.fileTypeFromName = (fileName) => {
  return fileTypeReg.exec(fileName)[1];
};

exports.bucketKeyCreator = (name, id, type) => {
  return `${name}.${id}.${type}`;
};
