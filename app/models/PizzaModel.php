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
                                 productType,
                                 productPath 
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
                                 productType,
                                 productPath 
                                 FROM products 
                                 WHERE productType = 'drink' AND productIsActive = 1");
        return $this->db->resultSet();
    }

    public function getSnacks()
    {
        $this->db->query("SELECT productId,
                                 productName,
                                 productPrice,
                                 productType,
                                 productPath 
                                 FROM products 
                                 WHERE productType = 'snack' AND productIsActive = 1");
        return $this->db->resultSet();
    }

    public function getPromotions()
    {
        $this->db->query("SELECT promotionId,
                                 promotionName,
                                 promotionStartDate,
                                 promotionEndDate
                                 FROM promotions
                                 WHERE promotionIsActive = 1");
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
