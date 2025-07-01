import React, { useState, useEffect } from 'react';
import NicknameInput from '../components/NicknameInput';

function CreateAccountPage() {
    const [nickname, setNickname] = useState("");
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);

    const handleSubmit = () => {
        const newErrors = {};
        if (nickname.length < 5 || nickname.length > 30) {
          newErrors.nickname = "Nickname must be between 5 and 30 characters";
        }
    
        setErrors(newErrors);
        setShowErrors(true);
    
        if (Object.keys(newErrors).length === 0){
            console.log("Form submitted:", { nickname });
            // TODO: AddAPI request here
        }
      };

      useEffect(() => {
          if(showErrors && errors.nickname) {
              if(nickname.length >= 5 && nickname.length <= 30) {
                  setErrors(prev => ({ ...prev, nickname: null }));
              }
          }
      }, [nickname]);

    return (
        <div>
            <h2>Open a bank account</h2>
            <NicknameInput
                nickname={nickname}
                setNickname={setNickname}
                error={errors.nickname}
                showError={showErrors}
            />
            <button onClick={handleSubmit}>Open Bank Account</button>
        </div>
    );
}



export default CreateAccountPage;