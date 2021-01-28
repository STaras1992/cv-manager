import { stateToHTML } from 'draft-js-export-html';

export const makeHtml = (content, direction, email) => {
  let html = stateToHTML(content);
  html = wrapHtmlWithTextDirection(html, direction);
  html = wrapHtmlWithFooter(html, email);
  html = makeHtmlPage(html);
  return html;
};

export const wrapHtmlWithTextDirection = (html, direction) => {
  const newHtml = `<div style="direction:${direction.toLowerCase()}">${html}</div>`;
  return newHtml;
};

const wrapHtmlWithFooter = (html, email) => {
  const newHtml = `${html}<br/><br/><br/><br/>
  <div style="text-align:center;">
        <p style="color:#808080;font-size:10px;">
          This message was sent by
          <a style="color:#454545;font-size:10px;text-decoration:none" href='http://18.193.76.149/' target='_blank' rel='noopener noreferrer'>
            CV-Manager
          </a>
          from ${email}
          <br />
          All reply messages sent directly and only to the applicant adress.
          <br />© CV-Manager, Stas Tarasenko
        </p>
      </div>`;
  return newHtml;
};

// h1 {margin:2px 0;}
// h2 {margin:2px 0;}
// h3 {margin:2px 0;}
// h4 {margin:2px 0;}
// h5 {margin:2px 0;}
// h6 {margin:2px 0;}
// p    {margin:2px 0;}

const makeHtmlPage = (htmlBody) => {
  const newHtml = `<!DOCTYPE html>
  <html>
  <head>
  <style>
  body {}
  p,h1,h2,h3,h4,h5,h6 {margin:0.2rem 0;}
  </style>
  </head>
  <body>
  ${htmlBody}
  </body>
  </html>`;

  return newHtml;
};
