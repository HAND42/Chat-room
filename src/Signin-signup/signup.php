<!DOCTYPE html>
<html lang="en">
<head>
	<title>Sign up chat room</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="../chat-room/database/chat.png" type="image/icon type">
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/signup.css">
<!--===============================================================================================-->
</head>
<body>
	
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form p-l-55 p-r-55 p-t-178" action="dosignup.php" method="post">
					<span class="login100-form-title">
						Sign Up
					</span>
<?php
if (isset($_GET["badsignup"])) {
	$message = $_GET["badsignup"];
	switch ($message) {
		case "1":
			$msg = "the login must contain only letters";
			break;
		case "2":
			$msg = "The login is already used";
			break;
		case "3":
			$msg = "password must be at least 4 characters long";
			break;
		default:
			$msg = "the passwords do not match";
	}
	echo "<h2 class= badsignup>$msg</h2>";
}
?>

					<div class="wrap-input100 validate-input m-b-16" data-validate="Please enter login">
						<input class="input100" type="text" name="login" placeholder="login">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-16" data-validate="Please enter first name">
						<input class="input100" type="text" name="prenom" placeholder="prenom">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-16" data-validate="Please enter last name">
						<input class="input100" type="text" name="nom" placeholder="nom">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Please enter password">
						<input class="input100" type="password" name="password1" placeholder="Enter your password">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Please enter password">
						<input class="input100" type="password" name="password2" placeholder="Enter your password again">
						<span class="focus-input100"></span>
					</div>

					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Sign up
						</button>
						<a class="reset" type="reset" href="signin.php">Cancel</a>
					</div>
				</form>
			</div>
		</div>
	</div>

</body>
</html>