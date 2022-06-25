<?php

if (isset($_POST["message"]) and isset($_POST["user_id"]) and isset($_POST["contact_id"]) and isset($_POST["nb_message"])) {

    $message = $_POST["message"];
    $user_id = $_POST["user_id"];
    $contact_id = $_POST["contact_id"];
    $nb_message = $_POST['nb_message'] + 1;
    date_default_timezone_set('Europe/Paris');



    $file = "../database/messages/conversation_{$user_id}_{$contact_id}.json";
    $file_bis = "../database/messages/conversation_{$contact_id}_{$user_id}.json";
    $file_channel =  "../database/discussion_channels/channel_{$contact_id}.json";
    $add = array(array(
        'user_id' => $user_id,
        'date' => date("H:i"),
        'message' => $message,
        'nb_message' => $nb_message
    ));
    if (file_exists($file)) {
        $JsonParser = file_get_contents($file);
        $extra = json_decode($JsonParser);
        $arrayMerged = array_merge($add, $extra);
        file_put_contents($file, json_encode($arrayMerged, JSON_UNESCAPED_SLASHES));
        echo $JsonParser;
        exit;
    } else if (file_exists($file_bis)) {
        $JsonParser = file_get_contents($file_bis);
        $extra = json_decode($JsonParser);
        $arrayMerged = array_merge($add, $extra);
        file_put_contents($file_bis, json_encode($arrayMerged, JSON_UNESCAPED_SLASHES));
        echo $JsonParser;
        exit;
    } else if (file_exists($file_channel)) {
        $JsonParser = file_get_contents($file_channel);
        $extra = json_decode($JsonParser);
        $arrayMerged = array_merge($add, $extra);
        file_put_contents($file_channel, json_encode($arrayMerged, JSON_UNESCAPED_SLASHES));
        echo $JsonParser;
        exit;
    } else {
        file_put_contents($file, json_encode($add, JSON_UNESCAPED_SLASHES));
    }
} else {
    echo "Isset non verif";
}
exit();
