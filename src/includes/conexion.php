<?php 
$servername = "localhost";
$username = "root";
$password = "";
$db="dulzuras_artesanales";
//crear conexion
$conn = mysqli_connect($servername,$username, $password,$db);
mysqli_set_charset($conn, "utf8");
//chequear conexion
if(!$conn){
	die("Connection failed: " .mysqli_connect_error());
}
?>