import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const client_id =
  "1015928772150-6kimvcn2ih8i6qqjf6n8i3ots1e7n8b1.apps.googleusercontent.com";

function SignInWithGoogle() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  });
  const onSuccess = (res) => {
    console.log("Login Succes currentUser:", res.profileObj);
  };
  const onFailure = (res) => {
    console.log("Login failed res:", res);
  };
  return (
    <div>
      <GoogleLogin
        clientId={client_id}
        buttonText="Log in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        // cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default SignInWithGoogle;
