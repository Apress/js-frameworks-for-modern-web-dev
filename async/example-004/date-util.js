'use strict';

module.exports = function (date) {
  date = date || new Date();
  var isLeapYear = (date.getFullYear() % 4 === 0);
  var daysInMonth = [31, (isLeapYear ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return {
    daysInMonth: function () {
      return daysInMonth[date.getMonth()];
    }
  };
};