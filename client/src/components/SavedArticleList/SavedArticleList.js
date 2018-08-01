import React from "react";
import "./SavedArticleList.css";

export const SavedArticleList = ({ children }) => {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">
        {children}
      </ul>
    </div>
  );
};
