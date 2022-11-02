-- migrate:up
CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    check_in_date DATETIME NOT NULL,
    check_out_date DATETIME NOT NULL,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    order_status_id INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (room_id) REFERENCES rooms (id),
    FOREIGN KEY (order_status_id) REFERENCES order_statuses (id)
)

-- migrate:down
DROP TABLE orders;
