<?php
header('Content-Type: application/json');
include 'db_connect.php';

// Get the JSON data sent from the JavaScript
$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];
$isApproved = $data['isApproved'];

$newStatus = $isApproved ? 'approved' : 'denied';

$sql = "UPDATE users SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $newStatus, $userId);

if ($stmt->execute()) {
    echo json_encode(['message' => 'User status updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to update user status']);
}

$stmt->close();
$conn->close();
?>