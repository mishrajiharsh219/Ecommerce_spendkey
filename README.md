# 🛒 Ecommerce Spendkey  

A **full-stack e-commerce application** that I built as part of the Spendkey take-home assignment.  
The project covers backend API development, frontend integration, database design, and recursive data structures (category tree).  

---

## 🚀 Features (Implemented)  

### 🔹 Backend (Spring Boot)  
- ✅ Provides a **category tree API** with recursive hierarchy (Electronics → Computers → Laptops etc.)  
- ✅ Fetches **products by category** (includes products from subcategories)  
- ✅ Allows users to **add products to cart** with quantity  
- ✅ Returns **cart items** with total price calculation  
- ✅ Supports **related products** API (many-to-many relationship)  

### 🔹 Frontend (Angular)  
- ✅ **Category Navigation Page** with recursive tree view for browsing categories  
- ✅ **Product Listing Page** displaying products with price, stock, and “Add to Cart” button  
- ✅ **Cart Page** showing items, quantity, price per unit, and total cost  
- ✅ **Form Handling** with Angular Reactive Forms for cart actions  
- ✅ Integrated product **images** to make the UI visually rich  

---

## 🛠️ Tech Stack  

- **Backend:** Java (Spring Boot)  
- **Frontend:** Angular 12+  
- **Database:** PostgreSQL  
- **Extras:** Docker support, Postman Collection for testing APIs  

---

## 📂 Database Schema  

### Category Table  
```sql
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT NULL,
    CONSTRAINT fk_parent_category FOREIGN KEY (parent_id) REFERENCES category(id) ON DELETE CASCADE
);
Product Table

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    availability_qty INT NOT NULL CHECK (availability_qty >= 0),
    category_id INT NOT NULL,
    main_image_url TEXT,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);
Cart Table

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);
Related Products Table
sql
Copy
Edit
CREATE TABLE related_product (
    product_id INT NOT NULL,
    related_product_id INT NOT NULL,
    PRIMARY KEY (product_id, related_product_id),
    CONSTRAINT fk_related_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    CONSTRAINT fk_related_product_ref FOREIGN KEY (related_product_id) REFERENCES product(id) ON DELETE CASCADE
);
```
⚙️ Setup & Run
1️⃣ Clone Repository
git clone https://github.com/your-username/ecommerce-spendkey.git
cd ecommerce-spendkey

2️⃣ Backend Setup (Spring Boot)
bash
Copy
Edit
cd backend
mvn clean install
mvn spring-boot:run
Runs on 👉 http://localhost:8080

3️⃣ Frontend Setup (Angular)
bash
Copy
Edit
cd frontend
npm install
ng serve
Runs on 👉 http://localhost:4200

4️⃣ Database Setup
Import data.sql into PostgreSQL

Update DB credentials in application.properties

📖 API Endpoints
Method	Endpoint	Description
GET	/categories	Get full category tree
GET	/products?categoryId=ID	Get products under a category (including subcategories)
POST	/cart/add	Add product to cart
GET	/cart	Get cart items with total price
GET	/product/{id}/related	Get related products

✅ Deliverables
Full backend (Spring Boot) + frontend (Angular) code

Database schema with seed data and images

Setup instructions (this README)

👨‍💻 Author
Harsh Mishra

