### Optimization Strategy

#### For SQL (PostgreSQL)

1. **Indexing**:

   - Add an index on the `price` column to optimize the filtering and sorting:
     ```sql
     CREATE INDEX idx_price ON products(price);
     ```
   - If queries often filter by `category`, add a composite index:
     ```sql
     CREATE INDEX idx_category_price ON products(category, price);
     ```

2. **Pagination**:

   - Use **keyset pagination** for large datasets to avoid performance degradation with `OFFSET`. For example:
     ```sql
     SELECT *
     FROM products
     WHERE price BETWEEN 50 AND 200
       AND (price, id) > ($last_price, $last_id)
     ORDER BY price ASC, id ASC
     LIMIT 10;
     ```
   - This avoids scanning skipped rows when using `OFFSET`.

3. **Caching**:

   - Use a query caching layer (e.g., Redis) to store frequently accessed data.
   - Example: Cache popular price ranges or products ordered by price.

---

#### For MongoDB

1. **Indexing**:

   - Create a compound index on `category` and `price` to improve the `find` and `sort` operations:
     ```javascript
     db.products.createIndex({ category: 1, price: -1 });
     ```

2. **Pagination**:

   - Avoid using `skip` for large datasets as it scans skipped documents. Instead, use **range-based pagination**:
     ```javascript
     db.products
       .find({ category: "Electronics", price: { $lt: lastPrice } })
       .sort({ price: -1 })
       .limit(5);
     ```

3. **Caching**:

   - Implement caching with a tool like Redis for common queries, such as popular categories.
