import React, { useState, useEffect } from 'react';
import Accounts from '../components/Accounts';
import NicknameInput from '../components/NicknameInput';
import axios from 'axios';

function CreateAccountPage() {
    const [nickname, setNickname] = useState("");
    const [accountType, setAccountType] = useState("")
    const [savingsGoal, setSavingsGoal] = useState("")
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);

    const handleSubmit = () => {
        const newErrors = {};
        if (nickname.length < 5 || nickname.length > 30) {
          newErrors.nickname = "Nickname must be between 5 and 30 characters";
        }
        
        if(accountType === "savings") {
            if(!savingsGoal || isNaN(savingsGoal) || savingsGoal <= 0 || savingsGoal >= 1000000){
                newErrors.savingsGoal = "Savings Goal must be greater than 0 and no more than $1,000,000"
            }
        }

        setErrors(newErrors);
        setShowErrors(true);
    
        if (Object.keys(newErrors).length === 0){
            console.log("Form submitted:", { nickname });
            // TODO: AddAPI request here
        }
        console.log("Savings goal:", savingsGoal);
      };

      useEffect(() => {
          if(showErrors && errors.nickname) {
              if(nickname.length >= 5 && nickname.length <= 30) {
                  setErrors(prev => ({ ...prev, nickname: null }));
              }
          }
      }, [nickname]);

      useEffect(() => {
        if (showErrors && errors.savingsGoal) {
          const goalAsNumber = parseFloat(savingsGoal);
          if (!isNaN(goalAsNumber) && goalAsNumber > 0 && goalAsNumber <= 1000000) {
            setErrors(prev => ({ ...prev, savingsGoal: null }));
          }
        }
      }, [savingsGoal]);

    return (
        <div>
            <h2>Open a bank account</h2>
            <NicknameInput
                nickname={nickname}
                setNickname={setNickname}
                error={errors.nickname}
                showError={showErrors}
            />
            <div>
            <Accounts
                account={accountType}
                setAccount={setAccountType}
                savingsGoal={savingsGoal}
                setSavingsGoal={setSavingsGoal}
                error={errors.savingsGoal}
                showError={showErrors}
            />
            </div>
            <button onClick={handleSubmit}>Create Account</button>
        </div>
    );
}
export default CreateAccountPage;