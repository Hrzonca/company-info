INSERT INTO department(dep_name)
VALUES ("IT"), ("Legal"), ("Sales"), ("Martketing"), ("Inventory");

INSERT INTO employee_role(title, salary, dep_id)
VALUES("Budtender", 30000, 3), ("Engineer", 120000, 1), ("Manager", 70000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Haleigh', 'Rzonca', 1, 2), ('Jake', 'Chief', 4, NULL), ('anna', 'cats', 2, 3), ('juile', 'house', 1, 4);