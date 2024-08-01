const express = require('express');
const app = express();
// const middleware = require('./middleware');

const selectAllSalesRecords = require('../model/salesrecordModel');

app.get('/api/getAllSaleOrderRecord', (req, res) => {
    data = {
        member_id: 3 //CHANGE HERE FOR DIFFERENT MEMBERS
    }
   

    selectAllSalesRecords.selectAllSalesRecords(data)
        .then(salesRecords => {
            console.log('Sales Records:', salesRecords);
            res.status(200).json(salesRecords);
        })
        .catch(error => {
            console.error('Error fetching sales records:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

module.exports = app;