use employee_tracker_db

INSERT INTO department (name)
VALUES 
    ("Sales"), -- department_id: 1
    ("Engineering"),-- department_id: 2
    ("Finance"), -- department_id: 3
    ("Legal"); -- department_id: 4

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Sales Lead", 100000, 1); -- role_id: 1
    ("Salesperson", 150000, 1); -- role_id: 2
    ("Lead Engineer", 150000, 2); -- role_id: 3
    ("Software Engineer", 120000, 2); -- role_id: 4
    ("Accountant", 160000, 3); -- role_id: 5
    ("Account Manager", 125000, 3); -- role_id: 6
    ("Legal Team Lead", 250000, 4); -- role_id: 7
    ("Lawyer", 190000, 4); -- role_id: 8

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("John", "Doe", 1, null);
    ("Mike", "Chan", 2, 1);
    ("Ashley", "Rodriguez", 3, null);
    ("Kevin", "Tupik", 4, 3);
    ("Kunal", "Singh", 5, null);
    ("Malia", "Brown", 6, 5);
    ("Sarah", "Lourde", 7, null);
    ("Tom", "Allen", 8, 7);