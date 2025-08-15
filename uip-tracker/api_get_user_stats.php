<?php
header('Content-Type: application/json');
include 'db_connect.php';

// Get the user ID sent from the JavaScript fetch request
$userId = $_GET['id'];

if (!$userId) {
    http_response_code(400); // Bad Request
    echo json_encode(['message' => 'User ID is required.']);
    exit();
}

$response = [];

try {
    // --- THIS IS THE CORRECTED SQL QUERY ---
    // We use "AS requiredHours" to rename the column in the result
   $sql = "SELECT required_hours, rendered_hours FROM users WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $stats = $result->fetch_assoc();
        $response['message'] = 'success';
        $response['data'] = $stats;
    } else {
        http_response_code(404);
        $response['message'] = 'User not found.';
    }
    
    $stmt->close();

} catch (Exception $e) {
    http_response_code(500);
    $response['message'] = 'Server error';
    $response['error'] = $e->getMessage();
}

$conn->close();
echo json_encode($response);
?>