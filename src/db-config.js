import pg from 'pg';
export const client = new pg.Client({ host: 'localhost', port: 5432, database: 'surfs_app' });
client.connect();
// let thingToInsert = `Robert ' ); drop table hats; --`;
// client.query(`INSERT INTO hats (type) VALUES ($1)`, [thingToInsert]).then((res) => {
//     console.log(res)
// }).then(() => {
//     client.end()
// })

