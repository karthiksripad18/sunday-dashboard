import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { gameMetricType, campaignMetricType } from '../../redux/types';

import './Chart.css';

type chartProps = {
    title: string;
    data: gameMetricType[] | campaignMetricType[]
}

const Chart = ({ title, data}: chartProps): JSX.Element => {
    return (
        <div>
            {
                data.length === 0?
                <p>No data to display the chart</p>
                :
                <>
                    <h3>{title}</h3>
                    <LineChart
                        width={500}
                        height={200}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" stroke='white' />
                        <YAxis stroke='white' />
                        <Tooltip contentStyle={{ backgroundColor: "black", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold" }} />
                        <Line type="monotone" dataKey="value" stroke="#ffffff" />
                    </LineChart>
                </>
            }
        </div>
    )
}

export default React.memo(Chart);
