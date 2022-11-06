DROP DATABASE IF EXISTS thecompany_db;
CREATE DATABASE thecompany_db;

USE thecompany_db;

CREATE TABLE department (
    id INT NOT NULL,
    dep_name VARCHAR(30) INT NOT NULL,
    FOREIGN KEY (dep_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE title (
    id INT NOT NULL,
    title VARCHAR(30) INT NOT NULL,
    salary DECIMAL INT NOT NULL,
    dep_id INT NOT NULL
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY(id)

);
-- not sure about the primary key part to connect two parts in the same table. --
-- look at lesson 20 for primary vs foregin keys --
