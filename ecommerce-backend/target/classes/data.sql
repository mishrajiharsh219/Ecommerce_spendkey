-- Categories
INSERT INTO category (id, name, parent_id) VALUES
(1, 'Electronics', NULL),
(2, 'Computers', 1),
(3, 'Laptops', 2),
(4, 'Desktops', 2),
(5, 'Mobiles', 1),
(6, 'Fashion', NULL),
(7, 'Men', 6),
(8, 'Women', 6);

-- Products with main image URLs
INSERT INTO product (id, name, price, availability_qty, category_id, main_image_url) VALUES
(1, 'Dell XPS 13', 1200.00, 10, 3, 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/13-9315/media-gallery/notebook-xps-13-9315-nt-blue-gallery-4.psd?fmt=pjpg&pscan=auto&scl=1&wid=3519&hei=2000&qlt=100,1&resMode=sharp2&size=3519,2000&chrss=full&imwidth=5000'),
(2, 'MacBook Pro', 2000.00, 5, 3, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1632788574000'),
(3, 'Gaming Desktop', 1500.00, 3, 4, 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),
(4, 'iPhone 14', 999.99, 8, 5, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-blue?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1660753032670'),
(5, 'Samsung Galaxy S23', 899.99, 12, 5, 'https://images.samsung.com/is/image/samsung/p6pim/in/2302/gallery/in-galaxy-s23-s911-sm-s911bzgcins-534856516?$650_519_PNG$'),
(6, 'Men T-Shirt', 25.50, 20, 7, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),
(7, 'Women Handbag', 120.00, 7, 8, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80');

-- Cart
INSERT INTO cart (id, user_id, product_id, quantity) VALUES
(1, 1, 1, 1),
(2, 1, 4, 2),
(3, 1, 6, 3);

-- Related products
INSERT INTO related_product (product_id, related_product_id) VALUES
(1, 2),
(4, 5);

-- Fix sequences after explicit IDs (PostgreSQL)
SELECT setval(pg_get_serial_sequence('category','id'), (SELECT MAX(id) FROM category));
SELECT setval(pg_get_serial_sequence('product','id'), (SELECT MAX(id) FROM product));
SELECT setval(pg_get_serial_sequence('cart','id'), (SELECT MAX(id) FROM cart));