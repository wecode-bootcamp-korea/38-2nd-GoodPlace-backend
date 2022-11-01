-- migrate:up
CREATE TABLE sellers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(200) NULL,
    password VARCHAR(200) NULL,
    nickname VARCHAR(200) NOT NULL,
    point DECIMAL(13, 3) NOT NULL DEFAULT 1000000,
    phone_number VARCHAR(50) NULL,
    social_id BIGINT NOT NULL UNIQUE,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
)

-- migrate:down
DROP TABLE sellers;
