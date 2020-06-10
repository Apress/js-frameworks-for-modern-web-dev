module.exports = {
    'development': {
        'client': 'sqlite3',
        'connection': {
            'filename': './db.sqlite3'
        },
        'migrations': {
            'tableName': 'migrations'
        },
        'seeds': {
            'directory': './seeds'
        }
    }
};
