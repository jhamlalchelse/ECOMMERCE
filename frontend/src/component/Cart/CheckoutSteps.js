import React from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const CheckoutSteps = ({activeStep}) => {
  const steps = [
    {
      label: <p>Shipping Details</p>,
    },
    {
      label: <p>Confirm Orders</p>,
    },
    {
      label: <p>Payment</p>,
    },
  ];
  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel className="mt-3">
        {steps.map((item,index) => (
          <Step key={index}>
            <StepLabel>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
