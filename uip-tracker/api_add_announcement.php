<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$title = $data['title'];
$content = $data['content'];
$event_date = $data['event_date'];
$status = $data['status'];
$posted_by = $data['posted_by']; // New field

$sql = "INSERT INTO announcements (title, content, event_date, status, posted_by) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $title, $content, $event_date, $status, $posted_by);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Announcement added successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to add announcement']);
}

$stmt->close();
$conn->close();
?>