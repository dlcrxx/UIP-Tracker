<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$title = $data['title'];
$content = $data['content'];
$event_date = $data['event_date'];
$status = $data['status'];
$posted_by = $data['posted_by']; // New field

$sql = "UPDATE announcements SET title = ?, content = ?, event_date = ?, status = ?, posted_by = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $title, $content, $event_date, $status, $posted_by, $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Announcement updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to update announcement']);
}

$stmt->close();
$conn->close();
?>