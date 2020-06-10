# Knex Example

Install npm dependencies:

```
$ npm install
```

Create the SQLite3 database by running the migration script(s):

```
$ knex migrate:latest
```

Populate the database with example data by running the seed script(s):

```
$ knex seed:run
```

## Good Example - Transactions

Run the example application:

```
$ node index
```

**Note:** You can run `$ node index` up to four times. Each time, you will a message indicating that $25 has been
successfully moved from Account 1 to Account 2. Subsequent attempts will report a transaction failure, due to a lack of funds
in Account 1.

## Bad Example - No Transactions

Run the example application:

```
$ node bad
```

Within `bad.js`, an error is simulated on line 45:

```
throw new Error('Woops!'); // Simulate an error here (power goes out, network issues, etc...)
```

Run the script multiple times, however, and notice how funds simply vanish.
