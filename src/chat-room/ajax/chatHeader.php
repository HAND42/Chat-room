<?php
if (isset($_POST["user_id"])) {
    //undefined_undefined
    $user_id = $_POST['user_id'];

    if (file_exists("../database/contact/contact$user_id.json")) {


        $JsonParser = file_get_contents("../database/contact/contact$user_id.json");

        echo $JsonParser;
    } else if (!(file_exists("../database/contact/contact$user_id.json"))) {
        echo "Pas de contact";
    }
} else {
    echo "Les issets ont echoue";
}
