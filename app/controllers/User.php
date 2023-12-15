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
            // Add a key 'success' to the array
            $ajaxResponse = [
                'success' => [
                    'state' => 200,
                    'message' => 'Succesfully signed up!'
                ]
            ];

            $customerEmail = $post['customeremail'];
            $customerPassword = $post['customerpassword'];
            $confirmPassword = $post['confirmpassword'];

            if (empty($post['customerfirstname'])) {
                unset($ajaxResponse['success']);
                $ajaxResponse['customerfirstname'] = [
                    'state' => 500,
                    'message' => 'First name cannot be empty.'
                ];
            }

            if (empty($post['customerlastname'])) {
                unset($ajaxResponse['success']);
                $ajaxResponse['customerlastname'] = [
                    'state' => 500,
                    'message' => 'Last name cannot be empty.'
                ];
            }

            if (empty($post['customeremail'])) {
                unset($ajaxResponse['success']);
                $ajaxResponse['customeremail'] = [
                    'state' => 500,
                    'message' => 'Email cannot be empty.'
                ];
            }

            if (empty($post['customerpassword'])) {
                unset($ajaxResponse['success']);
                $ajaxResponse['customerpassword'] = [
                    'state' => 500,
                    'message' => 'Password cannot be empty.'
                ];
            }

            if (empty($post['confirmpassword'])) {
                unset($ajaxResponse['success']);
                $ajaxResponse['confirmpassword'] = [
                    'state' => 500,
                    'message' => 'Confirm password cannot be empty.'
                ];
            }

            // Check if the email is already registered
            $emailExists = $this->userModel->checkEmailExists($customerEmail);

            if ($emailExists) {
                unset($ajaxResponse['success']);
                $ajaxResponse['customeremail'] = [
                    'state' => 500,
                    'message' => 'Email is already used'
                ];
            }

            if ($customerPassword !== $confirmPassword) {
                unset($ajaxResponse['success']);
                $ajaxResponse['confirmpassword'] = [
                    'state' => 500,
                    'message' => 'The confirm password doesnt match the password'
                ];
            }

            // Validate password
            if (!$this->validatePassword($customerPassword)) {
                unset($ajaxResponse['success']);
                $ajaxResponse['customerpassword'] = [
                    'state' => 500,
                ];
            }

            if (isset($ajaxResponse['success'])) {
                // Assuming createCustomer returns the user data upon successful registration
                $user = $this->userModel->createCustomer($post);

                // Call the login method to perform automatic login
                $user = $this->userModel->checkUserExists($customerEmail, $customerPassword);

                // Automatic login after successful registration
                session_start();
                $_SESSION['user'] = $user;
                session_write_close();
            }

            // Encode the array as JSON
            echo json_encode($ajaxResponse);
            exit;
        } else {
            $data = [
                'title' => 'User Sign in and Log in'
            ];
            $this->view('user/signin', $data);
        }
    }

    private function validatePassword($password)
    {
        // Password must be at least six characters long, contain at least one special character, and at least one uppercase character
        return preg_match('/^(?=.*[A-Z])(?=.*[!@#$%^&*()-=_+|;:",.<>?]).{6,}$/', $password);
    }

    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $post = filter_input_array(INPUT_POST, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

            $ajaxResponse = [
                'success' => [
                    'state' => 200,
                    'message' => 'Succesfully edited the password!'
                ]
            ];

            // Assuming $post contains the submitted form data
            $email = $post['customeremail'];
            $password = $post['customerpassword'];

            if (empty($email)) {
                unset($ajaxResponse['success']);
                $ajaxResponse['customeremail'] = [
                    'state' => 500,
                    'message' => 'Please fill in an email.'
                ];
            }

            if (empty($password)) {
                unset($ajaxResponse['success']);
                $ajaxResponse['customerpassword'] = [
                    'state' => 500,
                    'message' => 'Please fill in a password.'
                ];
            }

            
            if (isset($ajaxResponse['success'])) {
                $userExists = $this->userModel->checkUserExists($email, $password);
                if (isset($userExists) && !empty($userExists)) {
                    session_start();
                    // Login successful, do something with $user
                    // For example, store user information in the session
                    $_SESSION['user'] = $userExists;
                    session_write_close();
                } else {
                    unset($ajaxResponse['success']);
                    $ajaxResponse['loginfailed'] = [
                        'state' => 500,
                        'message' => 'Email or password is incorrect!'
                    ];
                }
            }

            // Redirect to a dashboard or another page
            echo json_encode($ajaxResponse);
            exit;
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
            $ajaxResponse = [
                'success' => [
                    'state' => 200,
                    'message' => 'succesfully updated the profile'
                ]
            ];

            if (empty($post['phonenumber'])) {
                unset($ajaxResponse['success']);
                $ajaxResponse['phonenumber'] = [
                    'state' => 500,
                    'message' => 'Phone number cannot be empty'
                ];
            }

            if (isset($ajaxResponse['success'])) {
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
            }

            echo json_encode($ajaxResponse);
            exit;
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

            $ajaxResponse = [
                'success' => [
                    'state' => 200,
                    'message' => 'Succesfully signed up!'
                ]
            ];

            // Check if the fields are empty or not
            if (empty($post['old-password'])) {
                unset($ajaxResponse['success']);
                $ajaxResponse['old-password'] = [
                    'state' => 500,
                    'message' => 'The field is empty please fill it in'
                ];
            }

            if (empty($post['new-password'])) {
                unset($ajaxResponse['success']);
                $ajaxResponse['new-password'] = [
                    'state' => 500,
                    'message' => 'The field is empty please fill it in'
                ];
            }

            if (empty($post['new-password-2'])) {
                unset($ajaxResponse['success']);
                $ajaxResponse['new-password-2'] = [
                    'state' => 500,
                    'message' => 'The field is empty please fill it in'
                ];
            }

            // Check if new password and confirm password match
            if ($post['new-password'] !== $post['new-password-2']) {
                unset($ajaxResponse['success']);
                $ajaxResponse['new-password'] = [
                    'state' => 500,
                    'message' => "the passwords don't match"
                ];
            }
            // Verify the old password
            session_start();
            $currentPassword = $_SESSION['user']->customerPassword;
            session_write_close();

            if (!empty($post['old-password']) && !empty($post['new-password']) && !empty(['new-password-2'])) {
                if ($post['old-password'] !== $currentPassword) {
                    // Old password is incorrect, handle this situation
                    unset($ajaxResponse['success']);
                    $ajaxResponse['old-password'] = [
                        'state' => 500,
                        'message' => 'The old password is incorrect'
                    ];
                }
            }

            if (isset($ajaxResponse['success'])) {
                // Old password is correct, proceed with updating the password
                $this->userModel->editPassword($post);

                // Update the session with the new password only if it's successful
                session_start();
                $_SESSION['user']->customerPassword = $post['new-password'];
                session_write_close();
            }

            echo json_encode($ajaxResponse);
            exit;
        } else {
            $data = [
                'title' => 'edit password'
            ];
            $this->view('user/editPassword', $data);
        }
    }
}
