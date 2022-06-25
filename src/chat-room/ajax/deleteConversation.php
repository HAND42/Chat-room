<?php
if (isset($_POST["contact_id"]) and isset($_POST["user_id"])) {

    $user_id = $_POST['user_id'];
    $contact_id = $_POST['contact_id'];

    if (file_exists("../database/contact/contact$user_id.json")) {
        if (file_exists("../database/messages/conversation_{$user_id}_{$contact_id}.json")) {
            unlink("../database/messages/conversation_{$user_id}_{$contact_id}.json");
        } else if (file_exists("../database/messages/conversation_{$contact_id}_{$user_id}.json")) {
            unlink("../database/messages/conversation_{$contact_id}_{$user_id}.json");
        } else if (file_exists("../database/discussion_channels/channel_{$contact_id}.json")) {
            unlink("../database/discussion_channels/channel_{$contact_id}.json");
        }

        $Json = file_get_contents("../database/users.json");
        $user_maj = json_decode($Json);
        for ($i = 0; $i < count($user_maj); $i++) {
            if (strcmp($user_id, $user_maj[$i]->user_id) == 0) {
                print_r($user_maj[$i]->channel);
                for ($j = 0; $j < count($user_maj[$i]->channel); $j++) {
                    if (strcmp($contact_id, $user_maj[$i]->channel[$j]) == 0) {
                        unset($user_maj[$i]->channel[$j]);
                    }
                }
                break;
            }
        }

        $JsonParser = file_get_contents("../database/contact/contact$user_id.json");
        $extra = json_decode($JsonParser);
        for ($i = 0; $i < count($extra); $i++) {
            if (strcmp($extra[$i]->contact_id, $contact_id) == 0) {
                unset($extra[$i]);
                break;
            }
        }
        $arr2 = array_values($extra);
        file_put_contents("../database/users.json", json_encode($user_maj, JSON_UNESCAPED_SLASHES));
        file_put_contents("../database/contact/contact$user_id.json", json_encode($arr2, JSON_UNESCAPED_SLASHES));
        if (empty($extra)) {
            unlink("../database/contact/contact$user_id.json");
            echo "Pas de contact";
        }
    } else if (!(file_exists("../database/contact/contact$user_id.json"))) {
        echo "Pas de contact";
    }
} else {
    echo "Les issets ont echoue";
}
