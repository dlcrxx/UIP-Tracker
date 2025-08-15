<?php
// --- DATABASE CONNECTION ---

// Database credentials
$servername = "localhost"; // Or "127.0.0.1"
$username = "root";
$password = ""; // Your MySQL password (leave empty if you have none)
$dbname = "uip_tracker_db";

// Create a new MySQLi connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection for errors
if ($conn->connect_error) {
    // Stop the script and show an error message if the connection fails
    die("Connection failed: " . $conn->connect_error);
}

// Set the character set to utf8mb4 for full Unicode support
$conn->set_charset("utf8mb4");

?>