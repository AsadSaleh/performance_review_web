CREATE TABLE employee (
  id          int          auto_increment primary key,
  name        varchar(100) NOT null, 
  department  varchar(100),
  city        varchar(100),
  email       varchar(100)
);
