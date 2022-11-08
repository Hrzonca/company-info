DROP DATABASE IF EXISTS thecompany_db;
CREATE DATABASE thecompany_db;

USE thecompany_db;

-- TODO: connect the tables using foregin and primary keys
-- connect department id to role department_id, 
-- connect role id to employee role_id
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dep_name VARCHAR(30),
);

CREATE TABLE role (
    id INT PRIMARY KEY  AUTO_INCREMENT,
    title VARCHAR(30) INT NOT NULL,
    salary DECIMAL INT NOT NULL,
    dep_id INT NOT NULL
    FOREIGN KEY(dep_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY(role_id) REFERENCES role(id)
    FOREIGN key (manager_id) REFERENCES role(id)
);
-- not sure about the primary key part to connect two parts in the same table. --
-- look at lesson 20 for primary vs foregin keys --
