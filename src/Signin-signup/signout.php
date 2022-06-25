<?php
session_start();
session_unset(); # réinitialise le tableau $_SESSION
session_destroy(); # détruit la session courante
header("Location: signin.php");
exit;
?>
