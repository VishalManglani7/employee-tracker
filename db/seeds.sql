INSERT INTO department (dept_name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES
("Sales Manager", 100000.00, 1),
("Salesperson", 80000.00, 1),
("Lead Engineer", 150000.00, 2),
("Software Engineer", 120000.00, 2),
("Account Manager", 160000.00, 3),
("Accountant", 120000.00, 3),
("Legal Team Lead", 250000.00, 4),
("Lawyer", 190000.00, 4);

SELECT * FROM role;
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, null)
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, null),
("Kevin", "Turpik", 4, 3),
("Kunal", "Singh", 5, null),
("Malia", "Brown", 6, 5),
("Sarah", "Lourd", 7, null),
("Tom", "Allen", 8,7);