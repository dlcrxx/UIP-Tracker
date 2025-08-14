
<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$title = $data['title'];
$content = $data['content'];
$greeting = $data['greeting'];
$status = $data['status'];

$sql = "INSERT INTO announcements (title, content, greeting, status) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $title, $content, $greeting, $status);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Announcement added successfully', 'id' => $conn->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to add announcement']);
}

$stmt->close();
$conn->close();
?>