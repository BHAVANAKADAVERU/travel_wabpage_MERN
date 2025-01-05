import React from 'react';
import "../styles/common-section.css";

const CommonSection = ({ title }) => {
  return (
    <section className="common__section">
      <h1 className="text-center">{title}</h1>
    </section>
  );
};

export default CommonSection;
