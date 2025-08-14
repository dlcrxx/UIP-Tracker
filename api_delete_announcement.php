<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

$sql = "DELETE FROM announcements WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Announcement deleted successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to delete announcement']);
}

$stmt->close();
$conn->close();
?>