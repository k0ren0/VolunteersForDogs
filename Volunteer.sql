SELECT * FROM dogs 

SELECT * FROM events

ALTER TABLE events
ADD COLUMN event_type VARCHAR(255) CHECK (event_type IN ('volunteer', 'customer')),
ADD COLUMN start_time TIME,
ADD COLUMN end_time TIME,
ADD COLUMN days_of_week VARCHAR(255);




CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    date DATE,
    location VARCHAR(255),
    volunteer_needed INT,
    volunteers_registered INT DEFAULT 0,
    user_id INT REFERENCES users(user_id),
    start_time TIME,
    end_time TIME,
    days_of_week VARCHAR(255),
	country VARCHAR(255),
	city VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_type VARCHAR(255) CHECK (event_type IN ('volunteer', 'customer'))
);
  
  --NEW VERSION!
  CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    date DATE,
    location VARCHAR(255),
    volunteer_needed INT,
    volunteers_registered INT DEFAULT 0,
    user_id INT REFERENCES users(user_id),
    start_time TIME, -- Измененный тип данных
    end_time TIME, -- Измененный тип данных
    days_of_week TEXT, -- Может хранить дни недели как строку, например, 'Monday,Tuesday'
    country VARCHAR(255),
    city VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_type VARCHAR(255) CHECK (event_type IN ('volunteer', 'customer'))
);

  




CREATE TABLE event_dogs (
    event_dog_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id),
    dog_id INT REFERENCES dogs(dog_id),
    UNIQUE(event_id, dog_id) -- Это гарантирует, что пары событие-собака уникальны
);


SELECT * FROM roles

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO roles (role_name) VALUES ('volunteer'), ('client');


SELECT * FROM users

жесткая привязка в базе по 3 параметрам
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    dateOfBirth DATE,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

пересоздаю на такой вариант 

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    dateOfBirth DATE,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

тут с вариантами 
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    dateOfBirth DATE,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id),
    CONSTRAINT check_email_or_username CHECK (COALESCE(email, username) IS NOT NULL)
);



CREATE TABLE feedback (
    feedback_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id),
    user_id INT REFERENCES users(user_id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_registrations (
    registration_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id),
    user_id INT REFERENCES users(user_id),
    registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

