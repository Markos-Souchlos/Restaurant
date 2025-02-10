CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    cat_name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE foods (
    id SERIAL PRIMARY KEY,
    title VARCHAR(70) UNIQUE NOT NULL,
    comment TEXT,
    price NUMERIC(4,2) NOT NULL,
    category_id INT NOT NULL REFERENCES categories(id)
);


INSERT INTO categories (cat_name) VALUES ('Apetizers'), ('Cheese'), ('Sauces'), ('Salads'), ('Pasta'), ('Risotto'), ('Pan cooked'), ('Beef Collection'), ('Sea food'), ('Sodas'), ('Beers'), ('Wines');

INSERT INTO foods (title, comment, price, category_id) VALUES (
    'Πατάτες τηγανητές φρέσκες', 
    'Παράγγειλε τηγανητές πατάτες και προσπάθησε να βρεις έναν λόγο, που οι τηγανητές πατάτες είναι συνοδευτικό και όχι κυρίως.. Το προιόν επιβαρύνεται με επιπλέον τέλος ανακύκλωσης PVC 0.1€ (συμπεριλαμβανομένου ΦΠΑ 24%)',
    3.6,
    1
);