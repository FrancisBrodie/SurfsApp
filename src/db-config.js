import pg from 'pg';
let client = new pg.Client({ host: 'localhost', port: 5432, database: 'surfs_app' });
client.connect(console.error);

