<?php
header('Content-Type: application/json');
include 'db_connect.php';

$sql = "SELECT id, full_name, role FROM users WHERE status = 'pending'";
$result = $conn->query($sql);

$pending_users = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $pending_users[] = $row;
    }
}

echo json_encode($pending_users);
$conn->close();
?>