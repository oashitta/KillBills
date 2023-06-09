DROP TABLE IF EXISTS payees CASCADE;

CREATE TABLE
  payees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    account_number VARCHAR(255),
    is_hidden BOOLEAN,
    category_id INTEGER REFERENCES categories(id) NOT NULL
  );