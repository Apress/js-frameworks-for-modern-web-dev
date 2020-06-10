'use strict';
var async = require('async');
var dateUtil = require('./date-util');

function createBill(plan, cb) {
  process.nextTick(function () {
    var bill = {
      plan: plan,
      total: plan.billAmt
    };
    cb(null, bill);
  });
}

function carrierFee(bill, cb) {
  process.nextTick(function () {
    bill.total += 10;
    cb(null, bill);
  });
}

function prorate(bill, cb) {
  if (!bill.plan.isNew) {
    return cb(null, bill);
  }
  process.nextTick(function () {
    bill.plan.isNew = false;
    var days = dateUtil().daysInMonth();
    var amtPerDay = bill.plan.billAmt / days;
    var prorateAmt = ((bill.plan.billDay - 1) * amtPerDay);
    bill.total -= prorateAmt;
    cb(null, bill);
  });
}

function govtExtortion(bill, cb) {
  process.nextTick(function () {
    bill.total = bill.total * 1.08;
    cb(null, bill);
  });
}

var pipeline = async.seq(
  createBill,
  carrierFee,
  prorate,
  govtExtortion
);

var plan = {
  type: 'Lots of Cell Minutes Plan!+',
  isNew: true,
  billDay: 15,
  billAmt: 100
};

pipeline(plan, function (err, bill) {
  if (err) {
    return console.error(err);
  }
  //bill = govtExtortion(prorate(carrierFee(createBill(plan))))
  console.log('$', bill.total.toFixed(2));
});