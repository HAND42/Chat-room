<?php
function normalize($nom)
{
    return ucfirst(strtolower(trim($nom)));
}
$contact_exist = "0";

if (isset($_POST["nom"]) and isset($_POST["prenom"]) and isset($_POST["user_id"])) {


    $nom = normalize($_POST["nom"]);
    $prenom = normalize($_POST["prenom"]);
    $user_id = $_POST['user_id'];
    $contact_id = $nom . '_' . $prenom;

    $read_file = file('../../Signin-signup/users.csv');
    foreach ($read_file as $line) {
        $tab = explode(',', $line);
        if (strcmp($tab[0], $contact_id) == 0) {
            $img_contact = $tab[3];
            $info_contact = "user registred";
            break;
        } else {
            $info_contact = "not registred yet";
            $img_contact = "./database/profile-picture/new-user.jpg";
        }
    }


    $add = array(array(
        'contact_id' => $contact_id,
        'nom' => $nom,
        'prenom' => $prenom,
        'img' => $img_contact,
        'info' => $info_contact
    ));

    if (file_exists("../database/contact/contact$user_id.json")) {
        $JsonParser = file_get_contents("../database/contact/contact$user_id.json");
        $extra = json_decode($JsonParser);
        $arrayMerged = array_merge($add, $extra);
        foreach ($extra as $value) {
            if (strcmp($contact_id, $value->contact_id) == 0) {
                $contact_exist = "1";
                break;
            }
        }
        if (strcmp($contact_exist, "0") == 0) {
            file_put_contents("../database/contact/contact$user_id.json", json_encode($arrayMerged, JSON_UNESCAPED_SLASHES));
        }
    } else if (!(file_exists("../database/contact/contact$user_id.json"))) {
        file_put_contents("../database/contact/contact$user_id.json", json_encode($add, JSON_UNESCAPED_SLASHES));
    }
    echo $contact_exist . "_" . $info_contact . "_" . $img_contact;
} else {
    echo "Les issets ont echoue";
}
