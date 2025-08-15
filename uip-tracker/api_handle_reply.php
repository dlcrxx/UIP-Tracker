<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$reply = $data['reply'];

if (empty($id) || empty($reply)) {
    http_response_code(400);
    echo json_encode(['message' => 'Report ID and reply text are required.']);
    exit();
}

try {
    $sql = "UPDATE reports SET admin_reply = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $reply, $id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Reply added successfully.']);
    } else {
        throw new Exception('Statement execution failed.');
    }
    $stmt->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Server error while adding reply.', 'error' => $e->getMessage()]);
}

$conn->close();
?>