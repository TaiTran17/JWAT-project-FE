import React from "react";

interface StepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  nextStep: () => void;
  prevStep: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const Step2: React.FC<StepProps> = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, lastName: e.target.value });
  };

  return (
    <div>
      <h2>Step 2</h2>
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default Step2;
