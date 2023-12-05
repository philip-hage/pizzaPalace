<?php

class PromotionModel
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
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
    
}