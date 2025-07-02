function NicknameInput({ nickname, setNickname, error, showError }) {
  
    return (
      <div>
        <label>Account Nickname</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {showError && error && <span className="error">{error}</span>}
      </div>
    );
  }
  
  export default NicknameInput;