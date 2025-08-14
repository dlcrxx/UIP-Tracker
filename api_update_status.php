<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$newStatus = 'Fixed';
// Get current timestamp in a format MySQL understands
$dateFixed = date('Y-m-d H:i:s'); 

if (empty($id)) {
    http_response_code(400);
    echo json_encode(['message' => 'Report ID is required.']);
    exit();
}

try {
    $sql = "UPDATE reports SET status = ?, date_fixed = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $newStatus, $dateFixed, $id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Report status updated successfully.']);
    } else {
        throw new Exception('Statement execution failed.');
    }
    $stmt->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Server error while updating status.', 'error' => $e->getMessage()]);
}

$conn->close();
?>