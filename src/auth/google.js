import React from 'react';

import { GoogleLogin } from '@react-oauth/google';

const google = () => {

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              console.log("hejhej");
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
    )
}

export default google;