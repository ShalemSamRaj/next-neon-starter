import React from "react";
import ResetPassword from "../components/ResetPassword/ResetPassword";

const page = ({ params: { token } }: { params: { token: string } }) => {
  return (
    <div className="flex justify-center items-center mt-12">
      <ResetPassword token={token} />
    </div>
  );
};

export default page;
