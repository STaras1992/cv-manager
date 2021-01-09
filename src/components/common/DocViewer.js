import React from 'react';

const DocViewer = ({ source }) => {
  if (!source) {
    return <div>DocViewer no file</div>;
  }
  console.log(source);
  //   const src = source;
  return (
    <div>
      <iframe src={'https://docs.google.com/viewer?url=' + source} title='file' width='100%' height='600'></iframe>
    </div>
  );
};

export default DocViewer;
