import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = React.memo(() => {
    return (
        <div id="header">
            <Link to="/" id="header-text">Food Catalogue</Link>
        </div>
    )
});

export default Header