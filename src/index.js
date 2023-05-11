import React from 'react';
import { render } from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

render(
    <GoogleOAuthProvider clientId="177079470533-t31kfg3847ifv40pl4oobcip47871rki.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);