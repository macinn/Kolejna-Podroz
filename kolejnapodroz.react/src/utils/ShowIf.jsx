import React from 'react';

function ShowIf({ cond, children }) {
  return (
    cond && children
  );
}

export default ShowIf;