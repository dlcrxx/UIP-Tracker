<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];
$remark = $data['remark'];
$timeIn = date('Y-m-d H:i:s');
$today = date('Y-m-d');

if (!$userId) { /* ... error handling ... */ }

try {
    $stmt = $conn->prepare("INSERT INTO attendance (user_id, time_in, remark, attendance_date) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $userId, $timeIn, $remark, $today);
    
    if ($stmt->execute()) {
        // Return the ID of the new record so we can use it for time-out
        echo json_encode(['message' => 'Time in successful', 'attendanceId' => $conn->insert_id]);
    } else {
        throw new Exception('Failed to record time in.');
    }
    $stmt->close();

} catch (Exception $e) { /* ... error handling ... */ }

$conn->close();
?>