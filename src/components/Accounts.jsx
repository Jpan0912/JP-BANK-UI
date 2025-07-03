import React, { useState} from 'react';
import SavingsGoalInput from './SavingsGoalInput';

function Accounts({ account, setAccount,savingsGoal, setSavingsGoal, error, showError}){
    const [showSavingsGoal, setShowSavingsGoal] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setAccount(value);
        setShowSavingsGoal(value === "savings");
      };
      
    return(
        <div>
            <label>
                Everyday Account
                <input 
                type="radio"
                name="account"
                value="everyday"
                checked={account === "everyday"}
                onChange={handleChange}
                />
            </label>

            <label>
                Savings Account
                <input 
                type="radio"
                name="account"
                value="savings"
                checked={account === "savings"}
                onChange={handleChange}               
                />
            </label>
            {showSavingsGoal && (
            <SavingsGoalInput
                savingsGoal={savingsGoal}
                setSavingsGoal={setSavingsGoal}
                error={error}
                showError={showError}
            />)}
        </div>
    )
}

export default Accounts;