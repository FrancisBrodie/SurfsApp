create database surfs_app; 
drop database surfs_app; 

create table users (
    id serial not null, 
    email varchar(255) not null,
    hashed_password text not null
); 

insert into users (
    email, 
    hashed_password
    )
    values (
        'fdsa@dfsdaw.com', 
        'test'
    ) 
returning id;

select * from users;
select * from users where id = 1;

alter table users drop column 'continent';

drop table users; 

\c surfs_app;
\d users; 
\l users; 

