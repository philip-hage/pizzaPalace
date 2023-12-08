<?php

class UserModel
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function createCustomer($post)
    {
        global $var;
        $this->db->query("INSERT INTO customers (customerId,
                                                customerFirstName,
                                                customerLastName,
                                                customerStreetName,
                                                customerZipCode,
                                                customerCity,
                                                customerEmail,
                                                customerPassword,
                                                customerPhone,
                                                customerType,
                                                customerCreateDate)
                                                VALUES (:id, :customerfirstname, :customerlastname, :customerstreetname, :customerzipcode, :customercity, :customeremail, :customerpassword,
                                                :customerphone, :customertype, :customercreatedate)");
        $this->db->bind(":id", $var['rand']);
        $this->db->bind(":customerfirstname", $post["customerfirstname"]);
        $this->db->bind(":customerlastname", $post["customerlastname"]);
        $this->db->bind(":customerstreetname", $post["customerstreetname"]);
        $this->db->bind(":customerzipcode", $post["customerzipcode"]);
        $this->db->bind(":customercity", $post["customercity"]);
        $this->db->bind(":customeremail", $post["customeremail"]);
        $this->db->bind(":customerpassword", $post["customerpassword"]);
        $this->db->bind(":customerphone", $post["customerphone"]);
        $this->db->bind(":customertype", 'member');
        $this->db->bind(":customercreatedate", $var['timestamp']);
        return $this->db->execute();
    }

    public function login($email, $password)
    {
        $this->db->query("SELECT * FROM customers WHERE customerEmail = :email");
        $this->db->bind(":email", $email);
        $row = $this->db->single();

        if ($row) {
            $stored_password = $row->customerPassword;

            // Compare the plain text password (not recommended)
            if ($password == $stored_password) {
                return $row; // Login successful, return user data
            }
        }

        return null; // Login failed
    }
}
