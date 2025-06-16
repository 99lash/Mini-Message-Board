CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY,
  text TEXT NOT NULL,
  name VARCHAR(100),
  country_code CHAR(2),
  created_date TIMESTAMP DEFAULT NOW()
);

INSERT INTO messages (id, text, name, country_code)
VALUES ('60e59db5-797d-4f4c-bcde-a8bb20ee5811', 'Hello, World', 'Ash', 'PH');