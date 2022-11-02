-- migrate:up
CREATE TABLE order_statuses (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL
)

-- migrate:down
DROP TABLE order_statuses;
