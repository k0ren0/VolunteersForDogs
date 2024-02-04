-- Создание таблицы "dog_breeds" для хранения информации о породах собак
CREATE TABLE dog_breeds (
    breed_id SERIAL PRIMARY KEY,
    breed_name VARCHAR(255)
);

-- Создание таблицы "cities" для хранения информации о городах, округах, улицах и домах
CREATE TABLE cities (
    city_id SERIAL PRIMARY KEY,
    city_name VARCHAR(255),
    district VARCHAR(255),
    street VARCHAR(255),
    house_number VARCHAR(255)
);

-- Создание таблицы "users" для хранения информации о пользователях
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(20),
    availability TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы "events" для хранения информации о мероприятиях и событиях
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    date DATE,
    location VARCHAR(255),
    created_by INT REFERENCES users(user_id),
    volunteer_needed INT,
    volunteers_registered INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы "volunteers" для хранения информации о добровольцах
CREATE TABLE volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(user_id),
    bio TEXT,
    dog_breeds VARCHAR(255),
    dog_sizes VARCHAR(255),
    distance INT,
    ratings NUMERIC,
    reviews TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы "event_volunteers" для отслеживания связей между событиями и добровольцами
CREATE TABLE event_volunteers (
    event_volunteer_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id),
    volunteer_id INT REFERENCES volunteers(volunteer_id),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы "event_requests" для отслеживания запросов от клиентов к добровольцам
CREATE TABLE event_requests (
    request_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id),
    client_id INT REFERENCES users(user_id),
    volunteer_id INT REFERENCES volunteers(volunteer_id),
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20)
);

-- Создание таблицы "messages" для хранения сообщений между пользователями
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(user_id),
    receiver_id INT REFERENCES users(user_id),
    content TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы "ratings_reviews" для хранения рейтингов и отзывов
CREATE TABLE ratings_reviews (
    rating_review_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id),
    volunteer_id INT REFERENCES volunteers(volunteer_id),
    client_id INT REFERENCES users(user_id),
    rating NUMERIC,
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);