CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(100),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);