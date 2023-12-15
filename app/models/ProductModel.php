<?php

class ProductModel
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getPizzas()
    {
        $this->db->query("SELECT productId,
                                 productName,
                                 productPrice,
                                 productType 
                                 FROM products 
                                 WHERE productType = 'pizza' AND productIsActive = 1
                                 ORDER BY productName ASC");
        return $this->db->resultSet();
    }

    public function getDrinks()
    {
        $this->db->query("SELECT productId,
                                 productName,
                                 productPrice,
                                 productType 
                                 FROM products 
                                 WHERE productType = 'drink' AND productIsActive = 1");
        return $this->db->resultSet();
    }

    public function getSnacks()
    {
        $this->db->query("SELECT productId,
                                 productName,
                                 productPrice,
                                 productType 
                                 FROM products 
                                 WHERE productType = 'snack' AND productIsActive = 1");
        return $this->db->resultSet();
    }

    public function getProductByType($params = NULL)
    {
        $typeFilter = isset($params['type']) ? $params['type'] : null;

        $query = "SELECT productId,
                                productName,
                                productPrice,
                                productType 
                                FROM products
                                WHERE productIsActive = 1";
        if ($typeFilter) {
            $query .= " AND productType = :type";
        }
        $this->db->query($query);
        // Bind parameters if needed
        if ($typeFilter) {
            $this->db->bind(':type', $typeFilter);
        }

        return $this->db->resultSet();
    }

    public function getProducts()
    {
        $this->db->query("SELECT productId,
                                 productName,
                                 productPrice,
                                 productType  
                                 FROM products 
                                 WHERE productIsActive = 1");

        return $this->db->resultSet();
    }

    public function getProductsByPagination($offset, $limit)
    {
        $this->db->query("SELECT productId,
                                 productName,
                                 productPrice,
                                 productType  
                                 FROM products 
                                 WHERE productIsActive = 1
                                 LIMIT :offset, :limit");
        $this->db->bind(':offset', $offset);
        $this->db->bind(':limit', $limit);
        return $this->db->resultSet();
    }

    public function getTotalProductCount()
    {
        $this->db->query("SELECT COUNT(*) as total FROM products WHERE productIsActive = 1");
        $result = $this->db->single();

        return $result->total;
    }

    public function getProductBySearch($params = NULL)
    {
        $searchProduct = isset($params['search']) ? $params['search'] : null;

        $this->db->query("SELECT productId,
                                 productName,
                                 productPrice,
                                 productType 
                                 FROM products
                                 WHERE productIsActive = 1 AND productName LIKE :search");
        $this->db->bind(':search', '%' . $searchProduct . '%');
        return $this->db->resultSet();
    }

    public function getProductByPrice($params = NULL)
    {
        $priceMin = isset($params['pricemin']) ? $params['pricemin'] : null;
        $priceMax = isset($params['pricemax']) ? $params['pricemax'] : null;

        $query = "SELECT productId,
                       productName,
                       productPrice,
                       productType 
                FROM products
                WHERE productIsActive = 1";

        if ($priceMin !== null && $priceMax !== null) {
            $query .= " AND productPrice BETWEEN :priceMin AND :priceMax";
        } elseif ($priceMin !== null) {
            $query .= " AND productPrice >= :priceMin";
        } elseif ($priceMax !== null) {
            $query .= " AND productPrice <= :priceMax";
        }

        $this->db->query($query);

        if ($priceMin !== null && $priceMax !== null) {
            $this->db->bind(':priceMin', $priceMin);
            $this->db->bind(':priceMax', $priceMax);
        } elseif ($priceMin !== null) {
            $this->db->bind(':priceMin', $priceMin);
        } elseif ($priceMax !== null) {
            $this->db->bind(':priceMax', $priceMax);
        }

        return $this->db->resultSet();
    }

    public function getProductByIngredient($params = NULL)
    {
        $typeFilter = isset($params['type']) ? $params['type'] : null;
        $ingredientFilter = isset($params['ingredients']) ? $params['ingredients'] : null;

        $query = "SELECT p.productName,
                         p.productPrice,
                         p.productType,
                         i.ingredientName,
                         i.ingredientPrice,
                         phi.productId,
                         phi.ingredientId
                         FROM producthasingredients as phi 
                         INNER JOIN products as p ON phi.productId = p.productId
                         INNER JOIN ingredients as i ON phi.ingredientId = i.ingredientId
                         WHERE 1"; // Start the WHERE clause

        if ($typeFilter) {
            $query .= " AND p.productType = :type";
        }

        if ($ingredientFilter) {
            // Generate named placeholders for each ingredient in the IN clause
            $ingredientPlaceholders = implode(',', array_map(function ($index) {
                return ":ingredient{$index}";
            }, array_keys($ingredientFilter)));

            $query .= " AND i.ingredientId IN (SELECT DISTINCT i.ingredientId FROM producthasingredients WHERE i.ingredientId IN ({$ingredientPlaceholders}))";
        }

        // Add DISTINCT keyword to select only distinct rows
        $query .= " AND p.productId IN (SELECT DISTINCT p.productId FROM producthasingredients)";

        $this->db->query($query);

        // Bind parameters if needed
        if ($typeFilter) {
            $this->db->bind(':type', $typeFilter);
        }

        // Bind ingredient parameters if needed
        if ($ingredientFilter) {
            foreach ($ingredientFilter as $index => $ingredientId) {
                $this->db->bind(":ingredient{$index}", $ingredientId);
            }
        }

        return $this->db->resultSet();
    }

    public function getReviewByProduct($productId)
    {

        $this->db->query('SELECT reviewRating
                                 FROM reviews
                                 WHERE reviewEntityId = :productId');
        $this->db->bind(':productId', $productId);
        return $this->db->resultSet();
    }

    public function getProductsByFilters($filters = [], $offset = NULL, $limit = NULL)
    {
        $query = "SELECT DISTINCT p.productId,
                                  p.productName,
                                  p.productPrice,
                                  p.productType 
                                  FROM products as p
                                  WHERE p.productIsActive = 1";

        // Add conditions based on the provided filters
        if (isset($filters['type'])) {
            $query .= " AND p.productType = :type";
        }

        if (isset($filters['ingredients'])) {
            $ingredientPlaceholders = implode(',', array_map(function ($index) {
                return ":ingredient{$index}";
            }, array_keys($filters['ingredients'])));

            $query .= " AND p.productId IN (SELECT DISTINCT phi.productId FROM producthasingredients as phi WHERE phi.ingredientId IN ({$ingredientPlaceholders}))";
        }

        if (isset($filters['rating'])) {
            $query .= " AND p.productId IN (SELECT DISTINCT r.reviewEntityId FROM reviews as r WHERE r.reviewRating >= :rating)";
        }

        if (isset($filters['search'])) {
            $query .= " AND p.productName LIKE :search";
        }

        if (isset($filters['pricemax'])) {
            $filters['pricemin'] = $filters['pricemin'] ?? 0;
            $query .= " AND p.productPrice BETWEEN :pricemin AND :pricemax";
        }

        if (isset($limit) && !empty($limit) && isset($offset)) {
            $query .= " LIMIT :offset, :limit";
        }

        // Execute the query and bind parameters
        $this->db->query($query);

        if (isset($limit) && !empty($limit) && isset($offset)) {
            $this->db->bind(':offset', $offset);
            $this->db->bind(':limit', $limit);
        }

        foreach ($filters as $key => $value) {
            if ($key === 'ingredients') {
                foreach ($value as $index => $ingredientId) {
                    $this->db->bind(":ingredient{$index}", $ingredientId);
                }
            } elseif ($key === 'search') {
                // Handle search
                $this->db->bind(':search', '%' . $value . '%');
            } elseif ($key !== 'page') { // Skip binding for 'page' parameter
                $this->db->bind(":$key", $value);
            }
        }

        return $this->db->resultSet();
    }

    public function getHomePageProducts($filters = [], $offset = NULL, $limit = NULL)
    {
        $query = "SELECT DISTINCT p.productId,
                              p.productName,
                              p.productPrice,
                              p.productType,
                              p.productDescription 
                              FROM products as p
                              WHERE p.productIsActive = 1";

        // Add conditions based on the provided filters
        if (isset($filters['type'])) {
            $query .= " AND p.productType = :type";
        }

        if (isset($filters['ingredients'])) {
            $ingredientPlaceholders = implode(',', array_map(function ($index) {
                return ":ingredient{$index}";
            }, array_keys($filters['ingredients'])));

            $query .= " AND p.productId IN (SELECT DISTINCT phi.productId FROM producthasingredients as phi WHERE phi.ingredientId IN ({$ingredientPlaceholders}))";
        }

        if (isset($filters['rating'])) {
            $query .= " AND p.productId IN (SELECT DISTINCT r.reviewEntityId FROM reviews as r WHERE r.reviewRating >= :rating)";
        }

        if (isset($filters['search'])) {
            $query .= " AND p.productName LIKE :search";
        }

        if (isset($filters['pricemax'])) {
            $filters['pricemin'] = $filters['pricemin'] ?? 0;
            $query .= " AND p.productPrice BETWEEN :pricemin AND :pricemax";
        }

        if (isset($offset) && isset($limit) && !empty($limit)) {
            $query .= " LIMIT :offset, :limit";
        }

        // Execute the query and bind parameters
        $this->db->query($query);

        if (isset($offset) && isset($limit) && !empty($limit)) {
            $this->db->bind(':offset', $offset);
            $this->db->bind(':limit', $limit);
        }

        foreach ($filters as $key => $value) {
            if ($key === 'ingredients') {
                foreach ($value as $index => $ingredientId) {
                    $this->db->bind(":ingredient{$index}", $ingredientId);
                }
            } elseif ($key === 'search') {
                // Handle search
                $this->db->bind(':search', '%' . $value . '%');
            } elseif ($key !== 'storeid' && $key !== 'page') {
                $this->db->bind(":$key", $value);
            }
        }

        return $this->db->resultSet();
    }

    public function getReviews()
    {
        $this->db->query("SELECT r.reviewId,
                                 r.reviewCustomerId,
                                 r.reviewRating,
                                 c.customerFirstName,
                                 c.customerLastName
                                 FROM reviews as r
                                 INNER JOIN customers as c ON r.reviewCustomerId = c.customerId
                                 WHERE reviewIsActive = 1");
        return $this->db->resultSet();
    }
}
