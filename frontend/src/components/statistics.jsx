// src/components/Statistics.js
import React from 'react';

const Statistics = ({ statistics }) => (
    <div>
        <h2>Statistics</h2>
        <p>Total Sale Amount: ${statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Unsold Items: {statistics.totalUnsoldItems}</p>
    </div>
);

export default Statistics;
