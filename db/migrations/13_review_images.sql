-- migrate:up
CREATE TABLE review_images (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    review_id INT NOT NULL,
    image_url VARCHAR(1000) NULL,
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);
-- migrate:down
DROP TABLE review_images;