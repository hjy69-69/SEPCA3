var db = require('./databaseConfig.js');
var SalesRecord = require('./salesRecord.js')
var salesRecordDB = {
    insertSalesRecord: function (data) {
        return new Promise( ( resolve, reject ) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                }
                else {
                    var sqlArgs = [data.price, data.price, new Date(), 'SGD', data.memberId];
                    var sql = 'INSERT INTO salesrecordentity (AMOUNTDUE,AMOUNTPAID,CREATEDDATE,CURRENCY,MEMBER_ID) VALUES (?,?,?,?,?)';
                    conn.query(sql, sqlArgs, function (err, result) {
                        if (err) {
                            conn.end();
                            return reject(err);
                        } else {
                            if(result.affectedRows > 0) {
                                conn.end();
                                return resolve({success: true, generatedId: result.insertId});
                            }
                        }
                    });
                }
            });
        });
    }
};
module.exports = salesRecordDB

var selectAllSalesRecords = {
    selectAllSalesRecords: function (data) {
        return new Promise( ( resolve, reject ) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                }
                else {
                    var sql = 'SELECT * FROM salesrecordentity WHERE member_id = ? ORDER BY id ASC;';
                    conn.query(sql, [data.member_id], function (err, result) {
                        if (err) {
                            conn.end();
                            return reject(err);
                        } else {
                            var salesRecordList = [];
                            for(var i = 0; i < result.length; i++) {
                                var salesProduct = new SalesRecord();
                                salesProduct.id = result[i].ID;
                                salesProduct.amountDue = result[i].AMOUNTDUE;
                                salesProduct.amountPaid = result[i].AMOUNTPAID;
                                salesProduct.amountPaidUsingPoints = result[i].AMOUNTPAIDUSINGPOINTS;
                                salesProduct.createdDate = result[i].CREATEDDATE;
                                salesProduct.currency = result[i].CURRENCY;
                                salesProduct.loyaltyPointsDeducted = result[i].LOYALTYPOINTSDEDUCTED;
                                salesProduct.posName = result[i].POSTNAME;
                                salesProduct.receiptNum = result[i].RECEIPTNO;
                                salesProduct.servedByStaff = result[i].SERVEDBYSTAFF;
                                salesProduct.memberId = result[i].MEMBER_ID;
                                salesProduct.storeId = result[i].STORE_ID;
                                salesRecordList.push(salesProduct);
                            }
                            conn.end();
                            return resolve(salesRecordList);
                        }
                    });
                }
            });
        });
    }
}
module.exports = selectAllSalesRecords