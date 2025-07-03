import { useState } from "react"

function SavingsGoalInput({ savingsGoal, setSavingsGoal, error, showError}){
    return (
    <div>
        <input 
        type="number" 
        placeholder="Enter savings goal"
        value={savingsGoal}
        onChange={(e) => setSavingsGoal(e.target.value)}
        />
        {showError && error && <span className="error">{error}</span>}
        )
    </div>
    );
}

export default SavingsGoalInput;