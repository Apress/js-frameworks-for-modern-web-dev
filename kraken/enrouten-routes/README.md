This project assumes that you have already installed the Knex command-line utility. If
not, install it with:

```
$ npm install -g knex
```

To initialize the project, run:

```
$ npm install
$ knex migrate:latest
$ knex seed:run
```

Start the Express application with:

```
$ node index.js
```

Test the API with:

```
$ npm test
```
