import React from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";
import { message } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";

import ResetPassword from "../components/ResetPassword";

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 45ch;
  background-color: ${props => props.theme.colors.gray[200]};
  padding: 3rem 2rem 1rem;
`;

function ForgotPassword() {
  const router = useRouter();

  const sendResetMail = ({ email }) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        message.success(
          "email send successfully. please check your email to reset password"
        );
        router.push("/login");
      })
      .catch(function(error) {
        console.log("error", error);
        message.error(error.message);
      });
  };

  return (
    <Main>
      <Head>
        <title>Forgot password</title>
      </Head>
      <FormContainer>
        <ResetPassword onNext={sendResetMail} />
      </FormContainer>
    </Main>
  );
}

export default ForgotPassword;
