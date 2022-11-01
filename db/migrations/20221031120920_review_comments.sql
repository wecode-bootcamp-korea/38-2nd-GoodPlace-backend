-- migrate:up
CREATE TABLE review_comments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content TEXT NULL,
    user_id INT NOT NULL,
    seller_id INT NOT NULL,
    review_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (seller_id) REFERENCES sellers(id),
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);
-- migrate:down
DROP TABLE review_comments;