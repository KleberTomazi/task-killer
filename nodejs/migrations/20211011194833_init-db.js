
exports.up = function (knex) {
    return knex.raw(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE SEQUENCE seq_users;
        CREATE TABLE users (
            id INT NOT NULL
                CONSTRAINT pk_users PRIMARY KEY DEFAULT NEXTVAL('seq_users'),
        
            name TEXT NOT NULL,
            email TEXT NOT NULL CONSTRAINT uq_users_email UNIQUE,
            password TEXT NOT NULL,
        
            utc_created_on TIMESTAMP
                NOT NULL CONSTRAINT df_users_utc_created_on DEFAULT (NOW())
        );
        ALTER SEQUENCE seq_users OWNED BY users.id;
        
        CREATE SEQUENCE seq_boards;
        CREATE TABLE boards (
            id INT NOT NULL
                CONSTRAINT pk_boards PRIMARY KEY DEFAULT NEXTVAL('seq_boards'),
        
            title TEXT NOT NULL,
            description TEXT,
        
            link TEXT NOT NULL CONSTRAINT uq_boards_link UNIQUE,
        
            utc_created_on TIMESTAMP
                NOT NULL CONSTRAINT df_boards_utc_created_on DEFAULT (NOW())
        );
        ALTER SEQUENCE seq_boards OWNED BY boards.id;
        
        CREATE TYPE user_role AS ENUM ('admin', 'guest');
        CREATE TABLE users_boards (
            user_id INT NOT NULL CONSTRAINT fk_users_boards_users REFERENCES users(id),
            board_id INT NOT NULL,
            role user_role NOT NULL,
        
            utc_created_on TIMESTAMP
                NOT NULL CONSTRAINT df_users_boards_utc_created_on DEFAULT (NOW()),
        
            CONSTRAINT fk_users_boards_boards FOREIGN KEY (board_id) REFERENCES boards(id),
            CONSTRAINT pk_users_boards PRIMARY KEY (user_id, board_id)
        );
        
        CREATE TABLE tasks (
            id UUID NOT NULL
                CONSTRAINT pk_tasks PRIMARY KEY DEFAULT (uuid_generate_v4()),
            board_id INT NOT NULL CONSTRAINT fk_tasks_boards REFERENCES boards(id),
            title TEXT NOT NULL,
            description TEXT,
        
            utc_deleted_on TIMESTAMP,
            utc_completed_on TIMESTAMP,
        
            utc_created_on TIMESTAMP
                NOT NULL CONSTRAINT df_tasks_utc_created_on DEFAULT (NOW())
        );
        
        CREATE TYPE task_event AS ENUM ('create', 'delete', 'complete');
        CREATE TABLE task_events (
            user_id INT NOT NULL CONSTRAINT fk_task_events_users REFERENCES users(id),
            task_id UUID NOT NULL CONSTRAINT fk_task_events_tasks REFERENCES tasks(id),
        
            event task_event not null,
            metadata jsonb,
        
            utc_created_on TIMESTAMP
                NOT NULL CONSTRAINT df_task_events_utc_created_on DEFAULT (NOW()),
        
            CONSTRAINT pk_task_events PRIMARY KEY (user_id, task_id)
        );
  `);
};

exports.down = function (knex) {
    return knex.raw(`
        DROP TABLE task_events;
        DROP TYPE task_event;
        DROP TABLE tasks;
        DROP TABLE users_boards;
        DROP TYPE user_role;
        DROP TABLE boards;
        DROP TABLE users;
        DROP EXTENSION "uuid-ossp";
    `);
};
