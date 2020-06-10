module.exports = {
    'development': {
        'client': 'sqlite3',
        'connection': {
            'filename': './db.sqlite'
        },
        'migrations': {
            'table_name': 'knex_migrations'
        },
        'seeds': {
            'directory': './seeds/development'
        }
    }
};
