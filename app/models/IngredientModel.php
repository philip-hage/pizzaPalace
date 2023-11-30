<?php

class IngredientModel
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getIngredients()
    {
        $this->db->query("SELECT ingredientId,
                                 ingredientName,
                                 ingredientPrice
                                 FROM ingredients
                                 WHERE ingredientIsActive = 1 ORDER BY ingredientName ASC");
        return $this->db->resultSet();
    }
}
