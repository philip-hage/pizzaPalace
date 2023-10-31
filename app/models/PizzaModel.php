<?php

class PizzaModel
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
                                 productCategory,
                                 productPath 
                                 FROM products 
                                 WHERE productCategory = 'pizza' AND productIsActive = 1");
        return $this->db->resultSet();
    }

    public function getDrinks()
    {
        $this->db->query("SELECT productId,
                                 productName,
                                 productPrice,
                                 productCategory,
                                 productPath 
                                 FROM products 
                                 WHERE productCategory = 'drink' AND productIsActive = 1");
        return $this->db->resultSet();
    }

    public function getSnacks()
    {
        $this->db->query("SELECT productId,
                                 productName,
                                 productPrice,
                                 productCategory,
                                 productPath 
                                 FROM products 
                                 WHERE productCategory = 'snack' AND productIsActive = 1");
        return $this->db->resultSet();
    }

    public function getPromotions()
    {
        $this->db->query("SELECT promotionId,
                                 promotionName,
                                 promotionStartDate,
                                 promotionEndDate,
                                 promotionPathA,
                                 promotionPathB,
                                 promotionPathC
                                 FROM promotions
                                 WHERE promotionIsActive = 1");
        return $this->db->resultSet();
    }

    
}
