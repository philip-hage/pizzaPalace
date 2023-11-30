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

    public function getProductByIngredient()
    {
        $this->db->query("SELECT p.productName,
                                 p.productPrice,
                                 p.productType,
                                 i.ingredientName,
                                 i.ingredientPrice,
                                 phi.productId,
                                 phi.ingredientId
                                 FROM producthasingredients as phi 
                                 INNER JOIN products as p ON phi.productId = p.productId
                                 INNER JOIN ingredients as i ON phi.ingredientId = i.ingredientId");
        return $this->db->resultSet();
    }
}
