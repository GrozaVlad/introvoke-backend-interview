BEGIN;
CREATE TABLE users
        (
            user_id text NOT NULL,
            role text NOT NULL,
            password text NOT NULL,
            first_name text,
            last_name text,
			CONSTRAINT users_pkey PRIMARY KEY (user_id)
        );

CREATE TABLE messages
		(
			message_id SERIAL,
			message text NOT NULL,
            user_id text NOT NULL,
            created_at date NOT NULL,
			CONSTRAINT messages_pkey PRIMARY KEY (message_id),
            CONSTRAINT encounters_fkey FOREIGN KEY(user_id) REFERENCES users(user_id)
		);

INSERT INTO users(user_id, role, password, username)
	VALUES ('00a288ab-ca37-4bde-a729-73e31fa526ad', 'ADMIN', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'SequelAdmin');
COMMIT;
-- password for SequelAdmin is admin