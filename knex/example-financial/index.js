'use strict';

var _ = require('lodash');
var colors = require('colors');
var knex = require('./lib/db');
var Table = require('cli-table');

/**
 * Displays a table listing accounts and their balances.
 */
var displayAccounts = function() {
    console.log(colors.green.underline('Accounts'));
    var table = new Table({
        'head': ['Account ID', 'Funds']
    });
    return knex.select('id', 'funds').from('accounts').then(function(accounts) {
        _.each(accounts, function(account) {
            table.push([account.id, account.funds]);
        });
        console.log(table.toString());
    });
};

/**
 * Moves the specified amount of funds from sourceAccountID to destAccountID
 */
var moveFunds = function(sourceAccountID, destAccountID, amount) {

    return knex.first('funds').from('accounts').where('id', sourceAccountID)
        .then(function(result) {
            if (!result) {
                throw new Error('Unable to locate funds for source account');
            }
            if (result.funds < amount) {
                throw new Error('Not enough funds are available in account');
            }
            return knex('accounts').where('id', sourceAccountID)
                .update({
                    'funds': result.funds - amount
                });
        })
        .then(function() {
            return knex.first('funds')
                .from('accounts')
                .where('id', destAccountID);
        })
        .then(function(result) {
            if (!result) {
                throw new Error('Unable to locate funds for destination account');
            }
            return knex('accounts').where('id', destAccountID)
                .update({
                    'funds': result.funds + amount
                });
        });

};

/* Move $25 from account 1 to account 2. */
displayAccounts()
    .then(function() {
        return moveFunds(1, 2, 25);
    }).then(function() {
        console.log('Transaction succeeded.');
    }).catch(function(err) {
        console.log('Transaction failed!', err);
    }).finally(function() {
        displayAccounts().then(process.exit);
    });
