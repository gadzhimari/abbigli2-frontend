import React from 'react';

import { FB_ID, DOMAIN_URL, GOOGLE_ID } from 'config';

const SocialLogin = () => {
  const fbLink = `https://facebook.com/dialog/oauth?client_id=${FB_ID}&redirect_uri=`;
  const googleLink = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&response_type=code&scope=openid%20email&redirect_uri=`;

  return (
    <div className="buttons-social">
      <a
        className="button-social facebook"
        href={`${fbLink}${DOMAIN_URL}oauth/facebook/?scope=public_profile,email`}
      >
        <div className="icon-wrap">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.419 16.005">
            <path d="M7.419,5.279L4.93,5.284V3.609c0,0-0.053-0.919,0.956-0.919c0-0.01,1.522,0,1.522,0V0.001H4.72 c0,0-3.081-0.178-3.081,3.498v1.792L0,5.295v2.662h1.639v8.048H4.93V7.957h2.206L7.419,5.279z" />
          </svg>
        </div>
        Facebook
      </a>
      <a
        className="button-social google-plus"
        href={`${googleLink}${DOMAIN_URL}oauth/google/`}
      >
        <div className="icon-wrap">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.146 14">
            <path
              d="M7.034,5.998c-0.002,0.795,0,1.591,0.003,2.386c1.343,0.042,2.685,0.022,4.026,0.042 c-0.593,2.96-4.639,3.917-6.775,1.986c-2.2-1.693-2.096-5.411,0.19-6.984C6.08,2.157,8.351,2.471,9.952,3.572 c0.626-0.579,1.215-1.197,1.78-1.839c-1.328-1.056-2.959-1.808-4.698-1.727C3.411-0.115,0.079,3.044,0.019,6.649 c-0.231,2.947,1.718,5.839,4.469,6.882c2.741,1.049,6.253,0.335,8.001-2.116c1.157-1.547,1.406-3.539,1.27-5.411 C11.516,5.988,9.277,5.991,7.034,5.998z M20.139,5.988c-0.004-0.666-0.007-1.333-0.014-1.999h-1.998 c-0.005,0.665-0.014,1.329-0.016,1.999c-0.672,0.003-1.339,0.006-2.01,0.013v1.987c0.671,0.008,1.341,0.015,2.01,0.021 c0.009,0.667,0.009,1.331,0.016,1.995h1.998c0.007-0.664,0.01-1.328,0.014-1.997C20.812,8,21.479,7.997,22.146,7.988V6.001 C21.479,5.994,20.809,5.994,20.139,5.988z"
            />
          </svg>
        </div>
        Google Plus
      </a>
    </div>
  );
};

export default SocialLogin;
