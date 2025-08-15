<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

// Get all data from the JavaScript fetch
$ticketId = $data['ticketId'];
$subject = $data['subject'];
$details = $data['details'];
$files = $data['files'];
$userId = $data['userId'];
$userName = $data['userName'];

// Basic validation
if (empty($ticketId) || empty($subject) || empty($userId) || empty($userName)) {
    http_response_code(400); // Bad Request
    echo json_encode(['message' => 'Missing required report information.']);
    exit();
}

try {
    // Prepare SQL to prevent injection
    $sql = "INSERT INTO reports (ticket_id, subject, details, files, status, user_id, user_name) VALUES (?, ?, ?, ?, 'Pending', ?, ?)";
    $stmt = $conn->prepare($sql);
    // 'ssssii' corresponds to the data types: string, string, string, string, integer, integer
    $stmt->bind_param("ssssis", $ticketId, $subject, $details, $files, $userId, $userName);

    if ($stmt->execute()) {
        http_response_code(201); // Created
        echo json_encode(['message' => 'Report created successfully']);
    } else {
        throw new Exception('Failed to execute statement.');
    }

    $stmt->close();

} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['message' => 'Server error while creating report.', 'error' => $e->getMessage()]);
}

$conn->close();
?>