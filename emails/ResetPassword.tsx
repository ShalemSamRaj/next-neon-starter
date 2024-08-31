import React, { CSSProperties } from "react";
import {
  Html,
  Container,
  Tailwind,
  Text,
  Link,
  Preview,
  Body,
  Img,
} from "@react-email/components";

const ResetPassword = ({
  name,
  resetLink,
}: {
  name: string;
  resetLink: string;
}) => {
  return (
    <Html>
      <Preview>Reset Your Password</Preview>
      <Tailwind>
        <Body
          // style={body}
          className="bg-[#15202b] text-white font-sans "
        >
          <Container className="bg-[#192734] shadow-xl px-4 pt-4 pb-[2rem]">
            <Text className="font-bold text-center text-3xl">
              Hi, Please Reset your password!
            </Text>

            <Text className="font-bold text-1xl">Hello {name},</Text>
            <Text className="mb-4">
              Please click on the link below to reset your password. This link
              will expire within next 10 minutes. Please Hurry!
            </Text>
            <Link
              href={resetLink}
              className="bg-[#015ebb] p-3 text-white font-semibold rounded shadow-white my-[16px]"
            >
              Reset Password
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// const body: CSSProperties = {
//   background: "#fff",
// };

// const heading: CSSProperties = {
//   fontSize: "32px",
// };

export default ResetPassword;
