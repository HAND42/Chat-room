<?php
if (isset($_POST["user_id"]) and isset($_POST["contact_id"])) {
    //undefined_undefined
    $user_id = $_POST['user_id'];
    $contact_id = $_POST['contact_id'];

    $JsonParser = file_get_contents("../database/users.json");
    $extra = json_decode($JsonParser);
    for ($i = 0; $i < count($extra); $i++) {
        if (strcmp($user_id, $extra[$i]->user_id) == 0) {
            $sfdgbf = $extra[$i]->channel;
            break;
        }
    }


    if (file_exists("../database/contact/contact$user_id.json")) {

        if (file_exists("../database/messages/conversation_{$user_id}_{$contact_id}.json")) {

            $message = file_get_contents("../database/messages/conversation_{$user_id}_{$contact_id}.json", FILE_IGNORE_NEW_LINES);
        } else if (file_exists("../database/messages/conversation_{$contact_id}_{$user_id}.json")) {
            $message = file_get_contents("../database/messages/conversation_{$contact_id}_{$user_id}.json", FILE_IGNORE_NEW_LINES);
        } else if (file_exists("../database/discussion_channels/channel_{$contact_id}.json")) {
            $message = file_get_contents("../database/discussion_channels/channel_{$contact_id}.json", FILE_IGNORE_NEW_LINES);
        } else {
            $message = "You haven't talk together yet";
        }

        $contact = file_get_contents("../database/contact/contact$user_id.json", FILE_IGNORE_NEW_LINES);
        $img_channel = './database/chat.png';
        $add = array(
            'contact' => $contact,
            'message_contact' => $message,
            'channel' => $sfdgbf,
            'img_channel' => $img_channel
        );
        echo json_encode($add);
    } else if (!(file_exists("../database/contact/contact$user_id.json"))) {
        echo "Pas de contact";
    }
} else {
    echo "Les issets ont echoue";
}
