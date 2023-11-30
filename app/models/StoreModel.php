<?php

class StoreModel
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getStores()
    {
        $this->db->query("SELECT storeId,
                                 storeName,
                                 storeZipcode,
                                 storeStreetName,
                                 storeCity,
                                 storePhone,
                                 storeEmail
                                 FROM stores
                                 WHERE storeIsActive = 1");
        return $this->db->resultSet();
    }
}