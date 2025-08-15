<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];
$attendanceId = $data['attendanceId'];
$timeOut = date('Y-m-d H:i:s');

if (!$userId || !$attendanceId) { /* ... error handling ... */ }

try {
    $conn->begin_transaction(); // Start a transaction

    // Get the time_in from the record we are updating
    $stmt = $conn->prepare("SELECT time_in FROM attendance WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $attendanceId, $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $record = $result->fetch_assoc();
    $stmt->close();

    if (!$record) throw new Exception('Attendance record not found.');

    // Calculate hours rendered
    $timeInDate = new DateTime($record['time_in']);
    $timeOutDate = new DateTime($timeOut);
    $interval = $timeInDate->diff($timeOutDate);
    $hoursRendered = $interval->h + ($interval->i / 60) + ($interval->s / 3600);

    // Update the attendance record with time_out and rendered hours
    $stmt = $conn->prepare("UPDATE attendance SET time_out = ?, rendered_today = ? WHERE id = ?");
    $stmt->bind_param("sdi", $timeOut, $hoursRendered, $attendanceId);
    $stmt->execute();
    $stmt->close();

    // Update the user's total rendered_hours
    $stmt = $conn->prepare("UPDATE users SET rendered_hours = rendered_hours + ? WHERE id = ?");
    $stmt->bind_param("di", $hoursRendered, $userId);
    $stmt->execute();
    $stmt->close();

    $conn->commit(); // Commit all changes

    echo json_encode(['message' => 'Time out successful', 'hoursRendered' => $hoursRendered]);

} catch (Exception $e) {
    $conn->rollback(); // Roll back changes if anything failed
    http_response_code(500);
    echo json_encode(['message' => 'Server error during time out.']);
}

$conn->close();
?>