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

const WelcomeTemplate = ({
  name,
  verifyLink,
}: {
  name: string;
  verifyLink: string;
}) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Tailwind>
        <Body
          // style={body}
          className="bg-[#15202b] text-white font-sans "
        >
          <Container className="bg-[#192734] shadow-xl px-4 pt-4 pb-[2rem]">
            <Text className="font-bold text-center text-3xl">
              Welcome Aboard, Please Verify your account!
            </Text>

            <Text className="font-bold text-1xl">Hello {name},</Text>
            <Text className="mb-4">
              Welcome to Starter Project.We are really happy to see you here.
              Please click on the link below to Verify your account. This link
              will expire within next 10 minutes. Please Hurry!
            </Text>
            <Link
              href={verifyLink}
              className="bg-[#015ebb] p-3 text-white font-semibold rounded shadow-white my-[16px]"
            >
              Verify Account
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

export default WelcomeTemplate;
