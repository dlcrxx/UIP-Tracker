<?php
// Set the header to indicate the response will be JSON
header('Content-Type: application/json');

// Include our database connection file
include 'db_connect.php';

// Prepare the response array
$response = [];

try {
    // The same SQL query as before
    $sql = "
        SELECT
            COUNT(*) AS totalUsers,
            SUM(CASE WHEN role = 'intern' THEN 1 ELSE 0 END) AS totalInterns,
            SUM(CASE WHEN role = 'staff' THEN 1 ELSE 0 END) AS totalStaff
        FROM users
        WHERE status = 'approved';
    ";

    // Prepare and execute the statement to prevent SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Fetch the single row of results
    $stats = $result->fetch_assoc();

    // Build a successful response
    $response['message'] = 'success';
    $response['data'] = $stats;

} catch (Exception $e) {
    // If an error occurs, build an error response
    http_response_code(500); // Set HTTP status code to 500 (Internal Server Error)
    $response['message'] = 'Server error while fetching dashboard stats';
    $response['error'] = $e->getMessage();
}

// Close the database connection
$conn->close();

// Encode the PHP array into a JSON string and output it
echo json_encode($response);

?>