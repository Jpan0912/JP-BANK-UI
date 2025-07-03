import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Accounts from '../components/Accounts';
import NicknameInput from '../components/NicknameInput';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


function CreateAccountPage() {
    const [nickname, setNickname] = useState("");
    const [accountType, setAccountType] = useState("")
    const [savingsGoal, setSavingsGoal] = useState("")
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const mock = new MockAdapter(axios, { delayResponse: 500});

        mock.onPost('https://api.example.com/accounts').reply((config) => {
            console.log("Mock Triggered")

            const { nickname, accountType, savingsGoal} = JSON.parse(config.data);
            const parsedGoal = parseFloat(savingsGoal);

            if ((accountType === 'savings' && parsedGoal >= 1000000)) {
                return [400, { error: "Mock validation failed" }];
              }

            return [201, {
                message: "Mock: Account created successfully",
                nickname,
                accountType,
                savingsGoal
            }];
        });
        return () => mock.restore();
    }, []);

    const handleSubmit = async () => {
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
            try{
                const response = await axios.post('https://api.example.com/accounts', {
                    nickname,
                    accountType,
                    savingsGoal: accountType === "savings" ? savingsGoal : null
                });
                
                console.log("Account created and Mock response:", response.data);
                navigate('/');
            }catch (error) {
                const errorMsg = error.response?.data?.error || error.message;
                console.error("Failed to submit form:", errorMsg);
              }
              
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