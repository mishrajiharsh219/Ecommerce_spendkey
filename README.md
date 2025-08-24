# Ecommerce_spendkey
# 🛒 Full-Stack E-Commerce Application  

This is a **full-stack e-commerce application** built as part of a take-home assignment.  
The project demonstrates backend API development, frontend integration, database design, and recursive data structures (category tree).  

---

## 🚀 Features  

### 🔹 Backend (Spring Boot / .NET Core)  
- Fetch **category tree** (recursive structure)  
- Fetch **products under category** (including subcategories)  
- Add product to **shopping cart**  
- View **cart items** with quantity & total price  
- **Bonus:** Related products API  

### 🔹 Frontend (Angular)  
- **Category Navigation Page** – Recursive tree view of categories  
- **Product Listing Page** – List products under category with Add to Cart option  
- **Cart Page** – Show all cart items with name, quantity, price, and total cost  
- **Form Handling** – Reactive / Template-driven forms for cart actions  

---

## 🛠️ Tech Stack  

- **Backend:** Java (Spring Boot) / C# (.NET Core)  
- **Frontend:** Angular (v12+)  
- **Database:** MySQL / PostgreSQL / MSSQL  
- **Optional:** Docker, Postman Collection, Unit Tests  

---

## 📂 Database Schema  

### Category Table  

-- =========================
-- CATEGORY TABLE
-- =========================
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT NULL,
    CONSTRAINT fk_parent_category FOREIGN KEY (parent_id) REFERENCES category(id) ON DELETE CASCADE
);

-- =========================
-- PRODUCT TABLE
-- =========================
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    availability_qty INT NOT NULL CHECK (availability_qty >= 0),
    category_id INT NOT NULL,
    main_image_url TEXT,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

-- =========================
-- CART TABLE
-- =========================
CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

-- =========================
-- RELATED PRODUCTS TABLE (Many-to-Many Self-Join)
-- =========================
CREATE TABLE related_product (
    product_id INT NOT NULL,
    related_product_id INT NOT NULL,
    PRIMARY KEY (product_id, related_product_id),
    CONSTRAINT fk_related_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    CONSTRAINT fk_related_product_ref FOREIGN KEY (related_product_id) REFERENCES product(id) ON DELETE CASCADE
);

-- =========================
-- RESET SEQUENCES AFTER INSERTS (PostgreSQL only)
-- =========================
SELECT setval(pg_get_serial_sequence('category','id'), (SELECT MAX(id) FROM category));
SELECT setval(pg_get_serial_sequence('product','id'), (SELECT MAX(id) FROM product));
SELECT setval(pg_get_serial_sequence('cart','id'), (SELECT MAX(id) FROM cart));
⚙️ Setup & Run
1️⃣ Clone Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2️⃣ Backend Setup (Spring Boot Example)
cd backend
mvn clean install
mvn spring-boot: run


Runs on 👉 http://localhost:8080

3️⃣ Frontend Setup (Angular Example)
cd frontend
npm install
ng serve


Runs on 👉 http://localhost:4200

4️⃣ Database Setup

Import data.sql into your database

Update DB credentials in:
application.properties (Spring Boot)

📖 API Endpoints
Method	Endpoint	Description
GET	/categories	Get full category tree
GET	/products?categoryId=ID	Get products under a category (with subcategories)
POST	/cart/add	Add product to cart
GET	/cart	Get cart items with total price
GET	/product/{id}/related	(Bonus) Get related products
✅ Deliverables

Backend + Frontend source code

SQL schema for categories, products, and cart

Setup instructions (this README)

👨‍💻 Author
Developed as part of Spendkey Take-Home Assignment
