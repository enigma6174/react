import { useState } from "react";

const messages = ["Learn React", "Apply For Jobs", "Invest Your Income"];

const App = () => {
  return (
    <>
      <StepContainer />
      {/* <StepContainer />
      <StepContainer /> */}
    </>
  );
};

const StepContainer = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
  };
  const handlePrevious = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((open) => !open)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <Message step={step}>{messages[step - 1]}</Message>

          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const Message = ({ step, children }) => {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
};

const Button = ({ textColor, bgColor, onClick, children }) => {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default App;
