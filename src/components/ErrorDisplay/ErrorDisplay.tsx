import React from 'react';

import './ErrorDisplay.css';

const ErrorDisplay = ({errorMsg}: {errorMsg: string}): JSX.Element => {
    return (
        <div className='error-display'>
            {`Error: ${errorMsg}`}
        </div>
    )
}

export default ErrorDisplay;
