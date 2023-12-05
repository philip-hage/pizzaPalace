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
}
