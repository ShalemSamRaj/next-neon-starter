"use client";

import React, { useState } from "react";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { verifyAccount } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const VerifyAccountPage = ({
  params: { token },
}: {
  params: { token: string };
}) => {
  const [err, setErr] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const handleClick = async () => {
    if (!token) {
      setErr("Something Fishy");
      return;
    }
    setLoading(true);

    const { error, data } = await verifyAccount(token);

    if (error) {
      setErr(error);
    }

    setSuccessMsg(data?.message ? data.message : "");
    setLoading(false);
    router.push("/signin");
  };

  return (
    <div className="p-4">
      <div className="min-w-[300px] max-w-[600px] mx-auto bg-card shadow-md rounded">
        <div className="p-4">
          <div className="flex justify-center my-4">
            <FontAwesomeIcon icon={faUserShield} className="text-4xl mr-2" />
            <h4 className="text-center text-2xl font-semibold">
              Account Activation
            </h4>
          </div>
          <FormError message={err} />
          <FormSuccess message={successMsg} />
          <div className="flex justify-center items-center mt-2">
            <Button type="submit" disabled={isLoading} onClick={handleClick}>
              Activate Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
