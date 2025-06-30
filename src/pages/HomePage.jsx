import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Welcome to JP Bank</h1>
            <Link to="/open-account">Open a bank account</Link>
        </div>
    );
}

export default HomePage;