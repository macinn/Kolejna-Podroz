import React from 'react';
import ShowIf from './ShowIf';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';

function ShowIfLoggedIn({ children }) {
    const {isAuthenticated} = useAuth0();
    useEffect(() => { }, [isAuthenticated])

  return (
      <ShowIf cond={isAuthenticated}>
          { children }
      </ShowIf>
  );
}

export default ShowIfLoggedIn;