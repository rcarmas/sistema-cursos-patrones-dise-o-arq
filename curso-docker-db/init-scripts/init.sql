-- Creación de la tabla users
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'creator', 'consumer')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla courses
CREATE TABLE courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    state VARCHAR(20) CHECK (state IN ('in_construction', 'active', 'inactive')) NOT NULL,
    creator_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla subscriptions
CREATE TABLE subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserción de Datos de Prueba en users
INSERT INTO users (first_name, last_name, email, password, role)
VALUES 
('Admin', 'User', 'admin2@admin.com', '12345678', 'admin'),
('Alice', 'Johnson', 'alice.johnson@creator.com', 'password123', 'creator'),
('Bob', 'Williams', 'bob.williams@creator.com', 'password123', 'creator'),
('Chris', 'Taylor', 'chris.taylor@creator.com', 'password123', 'creator'),
('Emma', 'Brown', 'emma.brown@creator.com', 'password123', 'creator'),
('Liam', 'Miller', 'liam.miller@consumer.com', 'password123', 'consumer'),
('Olivia', 'Davis', 'olivia.davis@consumer.com', 'password123', 'consumer'),
('Noah', 'Garcia', 'noah.garcia@consumer.com', 'password123', 'consumer'),
('Sophia', 'Martinez', 'sophia.martinez@consumer.com', 'password123', 'consumer'),
('James', 'Hernandez', 'james.hernandez@consumer.com', 'password123', 'consumer');

-- Inserción de Datos de Prueba en courses
INSERT INTO courses (title, description, state, creator_id)
VALUES 
('Curso de JavaScript', 'Curso completo para dominar JavaScript.', 'active', (SELECT id FROM users WHERE email = 'alice.johnson@creator.com')),
('Curso de Python', 'Aprende Python desde lo básico hasta avanzado.', 'active', (SELECT id FROM users WHERE email = 'bob.williams@creator.com')),
('Curso de React', 'Desarrollo de interfaces dinámicas con React.', 'in_construction', (SELECT id FROM users WHERE email = 'chris.taylor@creator.com')),
('Curso de Diseño UX/UI', 'Curso práctico para diseñar interfaces amigables.', 'active', (SELECT id FROM users WHERE email = 'emma.brown@creator.com')),
('Curso de SQL', 'Domina las bases de datos con SQL.', 'inactive', (SELECT id FROM users WHERE email = 'bob.williams@creator.com'));

-- Inserción de Datos de Prueba en subscriptions
INSERT INTO subscriptions (user_id, course_id)
VALUES 
((SELECT id FROM users WHERE email = 'liam.miller@consumer.com'), (SELECT id FROM courses WHERE title = 'Curso de JavaScript')),
((SELECT id FROM users WHERE email = 'olivia.davis@consumer.com'), (SELECT id FROM courses WHERE title = 'Curso de Python')),
((SELECT id FROM users WHERE email = 'noah.garcia@consumer.com'), (SELECT id FROM courses WHERE title = 'Curso de React')),
((SELECT id FROM users WHERE email = 'sophia.martinez@consumer.com'), (SELECT id FROM courses WHERE title = 'Curso de Diseño UX/UI')),
((SELECT id FROM users WHERE email = 'james.hernandez@consumer.com'), (SELECT id FROM courses WHERE title = 'Curso de SQL'));