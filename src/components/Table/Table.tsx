import React from 'react';
import { campaignMetricType } from '../../redux/types';

import './Table.css';

const Table = ({ data }: { data: campaignMetricType[]}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Installs</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row: campaignMetricType) => (
                        <tr key={row.day}>
                            <td>{row.day}</td>
                            <td>{row.value}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table;
