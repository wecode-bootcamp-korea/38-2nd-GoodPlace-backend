-- migrate:up
CREATE TABLE sub_categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NULL,
    main_category_id INT NOT NULL
    FOREIGN KEY (main_category_id) REFERENCES main_categories (id)
)

-- migrate:down
DROP TABLE sub_categories;
