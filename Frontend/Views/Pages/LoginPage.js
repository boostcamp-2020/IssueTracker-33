import React from 'react';

const LoginPage = () => {
  const githubOauth = () => {
    window.location.href = 'http://localhost:3000/auth/github';
  };

  return (
    <div>
      <div>
        <div>
          <span>ID: </span>
          <input type="text" />
        </div>
        <div>
          <span>PWD: </span>
          <input type="password" />
        </div>
      </div>
      <div>
        <button type="button" onClick={githubOauth}>
          GitHub으로 로그인하기
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
