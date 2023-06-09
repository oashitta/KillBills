DROP TABLE IF EXISTS bills CASCADE;
CREATE TABLE bills (
  id SERIAL PRIMARY KEY,
  payee_id INTEGER REFERENCES payees(id) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  amount MONEY,
  due_date DATE,
  reminder_date DATE,
  paid_date DATE,
  note VARCHAR(255),
  status BOOLEAN
);