<?php
header('Content-Type: application/json');
include 'db_connect.php';

$response = ['message' => 'failure', 'data' => []];

try {
    $sql = "SELECT id, ticket_id, subject, details, files, status, date_fixed, user_id, user_name, admin_reply FROM reports ORDER BY submitted_at DESC";
    $result = $conn->query($sql);
    
    $reports = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $reports[] = $row;
        }
    }
    
    $response['message'] = 'success';
    $response['data'] = $reports;

} catch (Exception $e) {
    http_response_code(500);
    $response['message'] = 'Server Error';
}

$conn->close();
echo json_encode($response);
?>