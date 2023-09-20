"use client";

import { useState } from "react";
import axios from "axios";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { useSnackbar } from "notistack";

const filed =
  "w-[100%] bg-[#F6F6F6] h-[60px] rounded-[4px] px-[20px] border-[1px] border-[#F6F6F6] focus:border-[#eee] text-[14px] text-[#444]";

const activeButton =
  "w-[100%] bg-[#76C7C9] h-[60px] rounded-[4px] flex justify-center items-center font-bold text-[#222] text-[14px] cursor-pointer";

const inactiveButton =
  "w-[100%] bg-[#f6f6f6] h-[60px] rounded-[4px] flex justify-center items-center font-bold text-[#888] text-[14px] cursor-not-allowed";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "https://dev.rapi.petlo.co/en/v1"
    : "https://rapi.petlo.co/en/v1";

const DeleteYourAccount = () => {
  const [step, setStep] = useState(1);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [token, setToken] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const firstStepHandler = async () => {
    setIsLoading(true);

    await axios
      .post(
        `${API_URL}/customers/request-deleting-the-account-with-credentials`,
        {
          phone_number: phoneNumber,
          password: password,
        }
      )
      .then((response) => {
        setToken(response.data.customer.session_token);
        setIsLoading(false);
        setStep(2);
      })
      .catch((error) => {
        setIsLoading(false);
        enqueueSnackbar(error.response.data.error.message);
      });
  };

  const secondStepHandler = async () => {
    setIsLoading(true);

    await axios
      .delete(`${API_URL}/customers/delete-for-credentials-method`, {
        headers: { Authorization: `bearer ${token}` },
        data: {
          verification_code: Number(verificationCode),
        },
      })
      .then(() => {
        setIsLoading(false);
        setStep(3);
      })
      .catch((error) => {
        setIsLoading(false);
        enqueueSnackbar(error.response.data.error.message);
      });
  };

  const isFirstStepInfoCompleted =
    phoneNumber.trim().length > 0 && password.trim().length > 0;

  const isSecondStepInfoCompleted = verificationCode.trim().length > 0;

  if (step === 1) {
    return (
      <div className="bg-[#fff] p-[28px] md:p-[0px] md:h-screen md:flex md:justify-center md:items-center">
        <div className="md:w-[372px] md:py-[72px]">
          <div className="mb-[32px]">
            <div className="font-extrabold text-[24px] text-[#222] mb-[4px]">
              Delete Your Account
            </div>

            <div className="font-medium text-[16px] text-[#666]">
              You can not use or recover your petlo account after you delete it.
            </div>
          </div>

          <div className="space-y-[20px]">
            <div className="space-y-[8px]">
              <div>
                <div className="font-bold text-[14px] text-[#222]">
                  Phone Number
                </div>
                <div className="font-medium text-[14px] text-[#666]">
                  with country code for example +962
                </div>
              </div>

              <input
                className={filed}
                placeholder="enter your phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </div>

            <div className="space-y-[8px]">
              <div className="font-bold text-[14px] text-[#222]">Password</div>
              <input
                className={filed}
                placeholder="enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div
              className={
                isFirstStepInfoCompleted ? activeButton : inactiveButton
              }
              onClick={
                isFirstStepInfoCompleted && isLoading === false
                  ? firstStepHandler
                  : undefined
              }
            >
              {isLoading ? (
                <UseAnimations animation={loading} size={24} color="222" />
              ) : (
                "Continue"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="bg-[#fff] p-[28px] md:p-[0px] md:h-screen md:flex md:justify-center md:items-center">
        <div className="md:w-[372px] md:py-[72px]">
          <div className="mb-[32px]">
            <div className="font-extrabold text-[24px] text-[#222] mb-[4px]">
              Confirm Deleting
            </div>

            <div className="font-medium text-[16px] text-[#666]">
              We sent an SMS with a 6 digit code to your phone number. Please
              type it below to complete deleting your account.
            </div>
          </div>

          <div className="space-y-[20px]">
            <div className="space-y-[8px]">
              <div className="font-bold text-[14px] text-[#222]">
                Verification Code
              </div>
              <input
                className={filed}
                placeholder="enter the verification code"
                onChange={(e) => setVerificationCode(e.target.value)}
                value={verificationCode}
              />
            </div>

            <div
              className={
                isSecondStepInfoCompleted ? activeButton : inactiveButton
              }
              onClick={
                isSecondStepInfoCompleted && isLoading === false
                  ? secondStepHandler
                  : undefined
              }
            >
              {isLoading ? (
                <UseAnimations animation={loading} size={24} color="222" />
              ) : (
                "Delete Your Account"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="bg-[#fff] h-screen flex justify-center items-center">
        <div className="font-extrabold text-[24px] text-[#222]">
          Your account has been successfully deleted
        </div>
      </div>
    );
  }
};

export default DeleteYourAccount;
