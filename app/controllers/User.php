<?php

class User extends Controller
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = $this->model("UserModel");
    }

    public function index()
    {
        $data = [
            'title' => 'User Sign in and Log in'
        ];
        $this->view('user/index', $data);
    }

    public function userSignin()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $post = filter_input_array(INPUT_POST, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

            // Check if the email is already registered
            $emailExists = $this->userModel->checkEmailExists($post['customeremail']);

            if ($emailExists) {
                header('Location:' . URLROOT . 'user/userSignin/{toast:false;toasttitle:Failed;toastmessage:Your+create+of+the+customer+has+failed}/');
            }

            if ($post['customerpassword'] !== $post['confirmpassword']) {
                echo "Passwords do not match";
                exit;
            } else {
                // Assuming createCustomer returns the user data upon successful registration
                $user = $this->userModel->createCustomer($post);

                if ($user) {
                    // Call the login method to perform automatic login
                    $email = $post['customeremail'];
                    $password = $post['customerpassword'];

                    $user = $this->userModel->login($email, $password);

                    if ($user) {
                        // Automatic login after successful registration
                        session_start();
                        $_SESSION['user'] = $user;
                        session_write_close();

                        header('Location:' . URLROOT . 'user/edit/');
                        exit();
                    } else {
                        echo "Login after registration failed"; // Handle login failure after registration
                    }
                } else {
                    echo "Registration failed"; // Handle registration failure
                }
            }
        } else {
            $data = [
                'title' => 'User Sign in and Log in'
            ];
            $this->view('user/signin', $data);
        }
    }

    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $post = filter_input_array(INPUT_POST, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

            // Assuming $post contains the submitted form data
            $email = $post['customeremail'];
            $password = $post['customerpassword'];

            $user = $this->userModel->login($email, $password);

            if ($user) {
                session_start();
                // Login successful, do something with $user
                // For example, store user information in the session
                $_SESSION['user'] = $user;
                session_write_close();

                // Redirect to a dashboard or another page
                header('Location:' . URLROOT . 'pizza/overview/');
                exit();
            } else {
                // Login failed, show an error message or redirect to the login page
                echo "Invalid email or password";
            }
        } else {
            $data = [
                'title' => 'User Sign in and Log in'
            ];
            $this->view('user/login', $data);
        }
    }

    public function logout()
    {
        session_start();
        // Unset all session variables
        $_SESSION = array();

        // Destroy the session
        session_destroy();

        // Redirect to the login page or any other page as needed
        header('Location:' . URLROOT . 'pizza/overview/');
        exit();
    }

    public function edit()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $post = filter_input_array(INPUT_POST, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            $this->userModel->edit($post);
            session_start();
            // Update session data with the new values
            $_SESSION['user']->customerFirstName = $post['firstname'];
            $_SESSION['user']->customerLastName = $post['lastname'];
            $_SESSION['user']->customerStreetName = $post['streetname'];
            $_SESSION['user']->customerZipCode = $post['zipcode'];
            $_SESSION['user']->customerCity = $post['city'];
            $_SESSION['user']->customerPhone = $post['phonenumber'];
            $_SESSION['user']->customerEmail = $post['email'];

            session_write_close();

            header('Location:' . URLROOT . 'user/edit/');
        } else {
            $data = [
                'title' => 'edit Customer',
            ];
            $this->view('user/edit', $data);
        }
    }

    public function editPassword()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $post = filter_input_array(INPUT_POST, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

            // Check if new password and confirm password match
            if ($post['new-password'] !== $post['new-password-2']) {
                echo "de wachtwoorden komen niet overeen";
                exit;
                header('Location:' . URLROOT . 'user/editPassword/');
                exit;
            }

            // Verify the old password
            session_start();
            $currentPassword = $_SESSION['user']->customerPassword;
            session_write_close();

            if ($post['old-password'] !== $currentPassword) {
                // Old password is incorrect, handle this situation
                echo 'het oude wachtwoord klopt niet';
                exit;
                header('Location:' . URLROOT . 'user/editPassword/');
                exit;
            } else {
                // Old password is correct, proceed with updating the password
                $this->userModel->editPassword($post);

                // Update the session with the new password only if it's successful
                session_start();
                $_SESSION['user']->customerPassword = $post['new-password'];
                session_write_close();

                header('Location:' . URLROOT . 'user/editPassword/');
                exit;
            }
        } else {
            // session_start();
            // Helper::dump($_SESSION);exit;
            // session_write_close();
            $data = [
                'title' => 'edit password'
            ];
            $this->view('user/editPassword', $data);
        }
    }
}
