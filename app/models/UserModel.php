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
                                            customerEmail,
                                            customerPassword,
                                            customerType,
                                            customerCreateDate)
                                            VALUES (:id, :customerfirstname, :customerlastname, :customeremail, :customerpassword,
                                            :customertype, :customercreatedate)");
        $this->db->bind(":id", $var['rand']);
        $this->db->bind(":customerfirstname", $post["customerfirstname"]);
        $this->db->bind(":customerlastname", $post["customerlastname"]);
        $this->db->bind(":customeremail", $post["customeremail"]);
        $this->db->bind(":customerpassword", $post["customerpassword"]);
        $this->db->bind(":customertype", 'member');
        $this->db->bind(":customercreatedate", $var['timestamp']);

        // Execute the query and return success status
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

    public function checkEmailExists($email)
    {
        $this->db->query("SELECT * FROM customers WHERE customerEmail = :email");
        $this->db->bind(":email", $email);
        $row = $this->db->single();

        return ($row) ? true : false;
    }

    public function edit($post)
    {
        $this->db->query("UPDATE customers SET customerFirstName = :customerFirstName,
                                               customerLastName = :customerLastName,
                                               customerStreetName = :customerStreetName,
                                               customerCity = :customerCity,
                                               customerZipCode = :customerZipCode,
                                               customerPhone = :customerPhone,
                                               customerEmail = :customerEmail
                                            WHERE customerId = :id");
        $this->db->bind(':id', $post['id']);
        $this->db->bind(':customerFirstName', $post['firstname']);
        $this->db->bind(':customerLastName', $post['lastname']);
        $this->db->bind(':customerStreetName', $post['streetname']);
        $this->db->bind(':customerCity', $post['city']);
        $this->db->bind(':customerZipCode', $post['zipcode']);
        $this->db->bind(':customerPhone', $post['phonenumber']);
        $this->db->bind(':customerEmail', $post['email']);
        $this->db->execute();
    }

    public function editPassword($post)
    {
        $this->db->query("UPDATE customers SET customerPassword = :customerPassword
                          WHERE customerId = :id");
        $this->db->bind(':id', $post['id']);
        $this->db->bind(':customerPassword', $post['new-password']);
        $this->db->execute();
    }
}
