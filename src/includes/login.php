<?php 
include 'conexion.php';

session_start();

$email=$_POST["mail"];
$pass=$_POST["pass"];

$query = "SELECT * FROM usuario WHERE email='$email' AND contrasenia=MD5('$pass') ";

$result = mysqli_query($conn,$query);
$num_row = mysqli_num_rows($result);
$row=mysqli_fetch_array($result);	



if( $num_row >=1 ) { 
$_SESSION['usuario']=$row['alias'];

$_SESSION['id']=$row['id'];

echo $_SESSION['usuario'];
//header("location: http://localhost/PaginaDulzurasArtesanales/src/Productos.php");
//echo 'ok';
}
else{
echo 'false';
}


?>