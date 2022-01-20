import React from 'react';
import './StatBoard.css';

export type StatBoardPropType = {
    count: number;
    name: string;
}

const StatBoard = ({count, name}: StatBoardPropType): JSX.Element => {
    return (
        <div data-test="component-statboard" className='stat-board'>
            <p className='stat-board__count'>{count}</p>
            <p className='stat-board__name'>{name}</p>
        </div>
    )
}

export default StatBoard;
