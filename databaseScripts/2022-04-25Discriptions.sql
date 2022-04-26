create database 'databaseName'; 
drop database 'databaseName'; 

create table 'tableName'(
    id serial not null, 
    email varchar(255) not null,
    hashed_password text not null
); 

insert into 'tableName' (
    email, 
    hashed_password
    )
    values (
        'fdsa@dfsdaw.com', 
        'test'
); 

insert into 'tableName' (
    email, 
    hashed_password
    )
    values (
        'fdsa@dfsdaw.com', 
        'test'
        ) 
returning id;

select * from 'tableName';
select * from 'tableName' where id = '#';

alter tableName 'tableName' drop column continent;

drop tableName 'tableName'; 

\c 'databaseName'; --'hit tab for auto complete'
\d'(iscribe)' 'tableName'; 
\l'(ist)' 'tableName'; 




