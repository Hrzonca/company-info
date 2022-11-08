DROP DATABASE IF EXISTS thecompany_db;

CREATE DATABASE thecompany_db;

USE thecompany_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    dep_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee_role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    dep_id INT,
    PRIMARY KEY (id)
    
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

--mysql has a lot ofl problems with this page and idk how to fix it 


-- not sure about the primary key part to connect two parts in the same table. --
-- look at lesson 20 for primary vs foregin keys --
  -- FOREIGN KEY (role_id) 
    -- REFERENCES employee_role(id)
    -- FOREIGN KEY (manager_id) 
    -- REFERENCES employee_role(id)