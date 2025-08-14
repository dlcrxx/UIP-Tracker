<?php
header('Content-Type: application/json');
include 'db_connect.php'; // Include your database connection

// Get the JSON data from the JavaScript fetch request
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

$response = [];

try {
    // Prepare a statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verify the hashed password
        if (password_verify($password, $user['password'])) {
            // Check if the account is approved
            if ($user['status'] === 'approved') {
                // Password is correct and user is approved!
                http_response_code(200); // OK
                $response['message'] = 'Login successful';
                // Remove password from the user object before sending it back
                unset($user['password']);
                $response['user'] = $user;
                // You can generate a real JWT token here if needed
                $response['token'] = 'fake-php-jwt-token';
            } else {
                // User exists but is not approved
                http_response_code(403); // Forbidden
                $response['message'] = 'Your account is pending approval or has been denied.';
            }
        } else {
            // Password is incorrect
            http_response_code(401); // Unauthorized
            $response['message'] = 'Invalid email or password';
        }
    } else {
        // No user found with that email
        http_response_code(401); // Unauthorized
        $response['message'] = 'Invalid email or password';
    }

    $stmt->close();

} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    $response['message'] = 'Server error during login.';
    $response['error'] = $e->getMessage();
}

$conn->close();
echo json_encode($response);
?>