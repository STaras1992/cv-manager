import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

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
