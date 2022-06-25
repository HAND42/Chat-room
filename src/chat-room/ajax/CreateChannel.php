<?php
if (isset($_POST["chanelName"]) and isset($_POST["arrayContacts"]) and isset($_POST["user_id"])) {
    $channelName = $_POST["chanelName"];
    $arrayContacts = $_POST["arrayContacts"];


    $user_id = $_POST['user_id'];
    $JsonParser = file_get_contents("../database/users.json");
    $extra = json_decode($JsonParser);
    for ($i = 0; $i < count($extra); $i++) {
        if (strcmp($user_id, $extra[$i]->user_id) == 0) {
            $extra[$i]->channel[] = "$channelName";
        }
    }
    for ($i = 0; $i < count(explode(',', $arrayContacts)); $i++) {
        $user_id_contact = explode(" ", explode(',', $arrayContacts)[$i])[1] . "_" . explode(" ", explode(',', $arrayContacts)[$i])[0];
        for ($j = 0; $j < count($extra); $j++) {
            if (strcmp($user_id_contact, $extra[$j]->user_id) == 0) {
                $extra[$j]->channel[] = "$channelName";
                break;
            }
        }
    }
    $add = array(array(
        'user_id' => $user_id,
        'date' => date("H:i"),
        'message' => "I create the channel $channelName",
        'nb_message' => 0
    ));
    file_put_contents("../database/discussion_channels/channel_{$channelName}.json", json_encode($add));
    file_put_contents("../database/users.json", json_encode($extra, JSON_UNESCAPED_SLASHES));
} else {
    echo "Issets failed";
}
