-- migrate:up
CREATE TABLE room_images (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    image_url VARCHAR(1000) NULL,
    FOREIGN KEY (room_id) REFERENCES rooms (id)
)

-- migrate:down
DROP TABLE room_images;
