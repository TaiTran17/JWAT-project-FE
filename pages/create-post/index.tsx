import { NextPage } from "next";
import React, { useState } from "react";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const IndexPage: NextPage & { getLayout?: boolean } = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const submitForm = () => {
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="my-10">
        <ul className="steps mb-8">
          <li className={`step ${step >= 1 ? "step-primary" : ""}`}>
            Blog information
          </li>
          <li className={`step ${step >= 2 ? "step-primary" : ""}`}>
            Choose plan
          </li>
        </ul>
      </div>
      {step === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          submitForm={submitForm}
        />
      )}
    </div>
  );
};

IndexPage.getLayout = true;

export default IndexPage;
