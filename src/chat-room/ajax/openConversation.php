<?php

if (isset($_POST["contact_id"]) and isset($_POST['login']) and isset($_POST['user_id'])) {
    $login = $_POST['login'];
    $contact_id = $_POST["contact_id"];
    $user_id = $_POST['user_id'];
    $count_messages = 0;


    if (file_exists("../database/messages/message{$user_id}_{$contact_id}.json")) {
        $json = file_get_contents($file);
        $data = json_decode($json);
        print_r($data);
    } else {
        echo "You haven't talk together yet";
    }
}
exit();
