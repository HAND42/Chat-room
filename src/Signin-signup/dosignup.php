<?php
function normalize($nom)
{
    return ucfirst(strtolower(trim($nom)));
}
$login = $_POST['login'];
$nom = normalize($_POST['nom']);
$prenom = normalize($_POST['prenom']);
$user_id = $nom . '_' . $prenom;
$password1 = $_POST['password1'];
$password2 = $_POST['password2'];

if (!preg_match("/^[a-zA-Z]+$/", $login)) {
    header("Location: signup.php?badsignup=1");
    exit();
}

$already_use = false;

$r = rand(1, 31);

$img_avatar = "./database/profile-picture/avatar$r.png";

$contacts = glob("../chat-room/database/contact/*.json");
for ($i = 0; $i < count($contacts); $i++) {
    $JsonParser = file_get_contents($contacts[$i]);
    $extra = json_decode($JsonParser, true);
    for ($i = 0; $j < count($extra); $j++) {
        if (strcmp($user_id, $extra[$j]['contact_id']) == 0) {
            $extra[$j]['info'] = "user registred";
            $extra[$j]['img'] = $img_avatar;
        }
    }

    $arr2 = array_values($extra);
    if (file_exists($contacts[$i])) {
        file_put_contents($contacts[$i], json_encode($arr2, JSON_UNESCAPED_SLASHES));
    }
}

foreach (file("users.csv") as $line) {
    $tab = explode(',', $line);
    if ($user_id == $tab[0]) {
        $already_use = true;
        break;
    }
}



$add = array(array(
    'user_id' => $user_id,
    'nom' => $nom,
    'prenom' => $prenom,
    'img' => $img_avatar,
    'channel' => array()
));

if (file_exists("../chat-room/database/users.json") and !$already_use) {
    $JsonParser = file_get_contents("../chat-room/database/users.json");
    $extra = json_decode($JsonParser);
    $arrayMerged = array_merge($extra, $add);
    file_put_contents("../chat-room/database/users.json", json_encode($arrayMerged, JSON_UNESCAPED_SLASHES));
} else if (!(file_exists("../chat-room/database/users.json"))) {
    file_put_contents("../chat-room/database/users.json", json_encode($add, JSON_UNESCAPED_SLASHES));
}

if ($already_use) {
    header("Location: signup.php?badsignup=2");
    exit;
}

if (strlen($password1) < 4) {
    header("Location: signup.php?badsignup=3");
    exit;
}

if ($password1 != $password2) {
    header("Location: signup.php?badsignup=4");
    exit;
}

$mtp_crypted = hash("md5", $password1);
$new_user = "$user_id,$login, $mtp_crypted, $img_avatar\n";
file_put_contents("users.csv", $new_user, FILE_APPEND);
header("Location: signin.php");
