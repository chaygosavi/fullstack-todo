import React, { useState } from "react";

const Auth = () => {
  const [error, setError] = useState(null);
  const isLogin = false;
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form action="">
          <h2>{isLogin ? "Please log in" : "Please sign up"}</h2>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {!isLogin ? (
            <input type="password" placeholder="confirm password" />
          ) : (
            <></>
          )}
          <input type="submit" value="" className="create" />
          {error ? <p>{error}</p> : <></>}
        </form>
      </div>
    </div>
  );
};

export default Auth;
