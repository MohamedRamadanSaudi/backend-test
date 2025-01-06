-- SQL Query 1: Fetch products with price between $50 and $200 with pagination
SELECT *
FROM products
WHERE price BETWEEN 50 AND 200
ORDER BY price ASC
LIMIT 10
OFFSET $1;


-- MongoDB Query 2: Get products by category with price sorting
db.products.find({ category: "Electronics" })
  .sort({ price: -1 })
  .skip((pageNumber - 1) * 5)
  .limit(5);
