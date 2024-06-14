import React from "react";

interface StepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  prevStep: () => void;
  submitForm: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const Step3: React.FC<StepProps> = ({
  formData,
  setFormData,
  prevStep,
  submitForm,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  return (
    <div>
      <h2>Step 3</h2>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <button onClick={prevStep}>Back</button>
      <button onClick={submitForm}>Submit</button>
    </div>
  );
};

export default Step3;
