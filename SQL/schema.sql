CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */
CREATE TABLE Users (
  u_id int(11) NOT NULL auto_increment,
  name varchar(30),
  primary key (u_id)
);

CREATE TABLE Rooms (
  r_id int(11) NOT NULL auto_increment,
  name varchar(30),
  primary key (r_id)
);

CREATE TABLE Messages (
  /* Describe your table here.*/
  id int(11) NOT NULL auto_increment,
  u_id int(11) NOT NULL,
  r_id int(11) NOT NULL,
  created_at timestamp,
  message varchar(140),
  primary key (id),
  foreign key (u_id) references Users (u_id),
  foreign key (r_id) references Rooms (r_id)
);

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




