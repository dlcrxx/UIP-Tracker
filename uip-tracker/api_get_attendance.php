<?php
header('Content-Type: application/json');
include 'db_connect.php';

$userId = $_GET['user_id'];
if (!$userId) {
    http_response_code(400);
    echo json_encode(['message' => 'User ID is required.']);
    exit();
}

$response = [];

try {
    $stmt = $conn->prepare("SELECT * FROM attendance WHERE user_id = ? ORDER BY attendance_date DESC");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $attendance_logs = [];
    while($row = $result->fetch_assoc()) {
        $attendance_logs[] = $row;
    }
    
    $response['message'] = 'success';
    $response['data'] = $attendance_logs;
    $stmt->close();

} catch (Exception $e) {
    http_response_code(500);
    $response['message'] = 'Server error';
}

$conn->close();
echo json_encode($response);
?>