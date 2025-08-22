"use client";

import PropTypes from "prop-types";
import { AppContext } from './AppContextProvider';
import { useContext } from 'react';

const AmazonLink = ({ title, author }) => {
 const { italian } = useContext(AppContext);

  if (!title) return null;

  const generateAmazonLink = (title, author) => {
    const baseUrl = "https://www.amazon.it/s";
    const query = encodeURIComponent(`${title} ${author || ""}`);
    const tag = "bookfinderita-21 ";
    return `${baseUrl}?k=${query}&tag=${tag}`;
  };

  const link = generateAmazonLink(title, author);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="amazon-buy-link"
      onClick={() => {
        console.log("Clicked the Amazon link for:", title, "\nlink url", link);
      }}>
      🔗 { italian ? 'Acquistalo su Amazon' : 'Buy it on Amazon'}
     
    </a>
  );
};

AmazonLink.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
};

export default AmazonLink;
