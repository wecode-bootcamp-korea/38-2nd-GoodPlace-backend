-- migrate:up
CREATE TABLE rooms_options (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    option_id INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms (id),
    FOREIGN KEY (option_id) REFERENCES options (id)
);
-- migrate:down
DROP TABLE rooms_options;