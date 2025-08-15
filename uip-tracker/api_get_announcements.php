<?php
header('Content-Type: application/json');
include 'db_connect.php';

// MODIFIED: Select the new posted_by column and format the event_date
$sql = "
    SELECT 
        id, title, content, status, posted_by,
        DATE_FORMAT(event_date, '%M %d, %Y') as event_date_formatted,
        DATE_FORMAT(created_at, '%M %d, %Y') as date,
        event_date
    FROM announcements 
    ORDER BY created_at DESC
";
$result = $conn->query($sql);

$announcements = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $announcements[] = $row;
    }
}

echo json_encode($announcements);
$conn->close();
?>