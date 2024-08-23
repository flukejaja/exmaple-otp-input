import React, { useState, useRef } from 'react';
import './OtpInput.css'; // For custom styling

const OtpInput = ({ length = 6, onComplete }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    const handleFocus = (index) => {
        if (index >= 0 && index < length) {
            inputRefs.current[index].focus();
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                handleFocus(index - 1);
            }
        }
    };

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }

            if (newOtp.join('').length === length) {
                onComplete(newOtp.join(''));
            }
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').trim();
        if (!pasteData) return;

        const split = pasteData.split('');
        const newOtp = [...otp];
        split.forEach((value, index) => {
            if (index < length) {
                newOtp[index] = value;
            }
        });
        setOtp(newOtp);
        onComplete(pasteData);
    };

    return (
        <div className="otp-container" onPaste={handlePaste}>
            {otp.map((value, index) => (
                <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={value}
                    onKeyDown={(e) => handleKeyDown(e, index)}

                    onChange={(e) => handleChange(e, index)}
                    maxLength="1"
                    ref={el => inputRefs.current[index] = el}
                    className="otp-input"
                />
            ))}
        </div>
    );
};

export default OtpInput;