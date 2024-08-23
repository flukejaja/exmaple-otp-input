import './App.css';
import OtpInput from './_components/otpInput';
function App() {
  const handleOtpComplete = (otp) => {
    console.log('OTP Entered:', otp);
    // Here you would typically send the OTP to the server for validation
  };
  return (
    <div className="App">
      <h1>Enter OTP</h1>
      <OtpInput length={6} onComplete={handleOtpComplete} />
    </div>
  );
}

export default App;
