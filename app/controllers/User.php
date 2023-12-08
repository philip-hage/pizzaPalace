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
            $this->userModel->createCustomer($post);
            header('Location:' . URLROOT . 'user/login/');
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
                // Login successful, do something with $user
                // For example, store user information in the session
                $_SESSION['user'] = $user;
                
                Helper::dump($_SESSION);exit;

                // Redirect to a dashboard or another page
                header('Location:' . URLROOT . 'user/login/');
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
}
