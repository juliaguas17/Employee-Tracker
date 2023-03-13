CREATE TABLE department (
    id INT NOT NULL IDENTITY(1,1),
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL IDENTITY(1,1),
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee (
    id INT NOT NULL IDENTITY(1,1),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);