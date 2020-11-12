import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';

const GrayBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #eeeeee;
`;

const PageWrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 400px;
  height: 350px;
  border: 1px solid var(--border-gray);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const InputDiv = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid var(--border-gray);
`;

const GithubLogin = styled.button`
  width: 300px;
  height: 35px;
  margin-top: 30px;
  background-color: var(--login-gray);
  box-shadow: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  text-align: center;
`;

const SubmitText = styled.div`
  width: 62%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  color: white;
  font-size: 18px;
`;

const LoginPage = () => {
  const githubOauth = () => {
    window.location.href = 'http://localhost:3000/auth/github';
  };

  return (
    <>
      <GrayBackground>
        <PageWrapper>
          <LoginWrapper>
            <h1>이슈트래커</h1>
            <InputWrapper>
              <div>
                <InputDiv>
                  <h3>아이디 </h3>
                  <Input type="text" />
                </InputDiv>
                <InputDiv>
                  <h3>비밀번호 </h3>
                  <Input type="password" />
                </InputDiv>
              </div>
              <div>
                <GithubLogin type="button" onClick={githubOauth}>
                  <SubmitText>
                    <span>Sign in with Github</span>
                    <GitHubIcon style={{ fontSize: 20 }} />
                  </SubmitText>
                </GithubLogin>
              </div>
            </InputWrapper>
          </LoginWrapper>
        </PageWrapper>
      </GrayBackground>
    </>
  );
};

export default LoginPage;
