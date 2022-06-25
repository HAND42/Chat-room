<?php
session_start();

$login = $_POST['login'];
$password = hash("md5", $_POST['password']);
$client_connu = false;
$bon_mtp = false;
$read_file = file('users.csv');

foreach ($read_file as $line) {
	$tab = explode(',', $line);
	if ($tab[1] == $login) {
		$client_connu = true;
	}
	if (strcmp($password, $tab[2])) {
		$bon_mtp = true;
		$img_user = $tab[3];
		$user_id = $tab[0];
	}
}

if ($client_connu) {
	$_SESSION['login'] = $login;
	$_SESSION["avatar"] = $img_user;
	$_SESSION['user_id'] = $user_id;
	if ($bon_mtp) {
		header("Location: ../chat-room/chatroom.php");
		exit;
	} else {
		header("Location: signin.php?badlogin=1");
		exit;
	}
} else {
	header("Location: signin.php?badlogin=1");
	exit;
}
