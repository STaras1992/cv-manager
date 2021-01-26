import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { stateToHTML } from 'draft-js-export-html';

export const makeHtml = (content) => {
  let html = stateToHTML(content);
  html = `${html}<br/><br/><br/><br/>
  <div>
        <p style="color:#808080;font-size:10px;">
          This message was sent from stas23061992@gmail.com by
          <a style="color:#454545;font-size:10px;text-decoration:none" href='http://18.193.76.149/' target='_blank' rel='noopener noreferrer'>
            CV-Manager
          </a>
          <br />
          All reply messages sent directly to the applicant.
          <br />© CV-Manager, Stas Tarasenko
        </p>
      </div>`;
  return html;
};

export const useHtmlWrapWith = () => {
  const [html, setHtml] = useState('');
  const [firstRender, setFirstRender] = useState(true);
  const [replyTo, setReplyTo] = useState(false);
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [website, setWebsite] = useState(false);

  const userEmail = useSelector((state) => state.user.email);
  const userFirstName = useSelector((state) => state.user.firstName);
  const userLastName = useSelector((state) => state.user.lastName);
  const userWebsite = useSelector((state) => state.user.website);

  const setNewHtml = (newHtml) => {
    setHtml(newHtml);
  };

  const wrapWithReplyTo = () => {
    setReplyTo(true);
  };

  const wrapWithFirstName = () => {
    setFirstName(true);
  };

  const wrapWithLastName = () => {
    setLastName(true);
  };

  const wrapWithWebsite = () => {
    setWebsite(true);
  };

  useEffect(() => {
    if (!firstRender) setHtml(html + `<h6>Reply to:${userEmail}</h6>`);
  }, [replyTo]);
  useEffect(() => {
    if (!firstRender) setHtml(html + `<h6>${userFirstName} ${userLastName}</h6>`);
  }, [firstName, lastName]);
  useEffect(() => {
    if (!firstRender) setHtml(html + `<h6>My website:<a>${userWebsite}</a></h6>`);
  }, [website]);
  useEffect(() => {
    setFirstRender(false);
  }, []);

  return [html, setHtml, wrapWithReplyTo, wrapWithWebsite, wrapWithFirstName, wrapWithLastName];
};

export default useHtmlWrapWith;
