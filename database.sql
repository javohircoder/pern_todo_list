create database perntodo;

create table todo (
  todo_id serial not null  PRIMARY KEY, 
  description varchar(255)
);
