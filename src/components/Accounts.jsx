import React, { useState} from 'react';

function Accounts({ account, setAccount, error, showError}){
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
            {showSavingsGoal && (<input type="number" placeholder="Enter savings goal"/>)}
        </div>
    )
}

export default Accounts;