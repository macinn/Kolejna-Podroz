import React from 'react';
import ShowIf from './ShowIf';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';

function ShowIfAdmin({ children }) {
    const { isAuthenticated, user } = useAuth0();
    useEffect(() => { }, [isAuthenticated, user])

    return (
        <ShowIf cond={isAuthenticated && user.role == 'Admin'}>
            {children}
        </ShowIf>
    );
}

export default ShowIfAdmin;