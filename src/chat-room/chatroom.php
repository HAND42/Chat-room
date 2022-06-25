<?php
session_start();
if (!isset($_SESSION["login"])) {
  header("Location:../Signin-signup/signin.php");
  exit();
}
$login = $_SESSION['login'];
foreach (file("../Signin-signup/users.csv") as $line) {
  $tab = explode(',', $line);
  if (strcmp($login, $tab[1]) == 0) {
    $avatar = $tab[3];
    $user_id = $tab[0];
    break;
  } else {
    $avatar = "./database/profile-picture/new-user.jpg";
  }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Chat Room</title>
  <link rel="icon" href="../chat-room/database/chat.png" type="image/icon type">
  <link rel="stylesheet" href="./style-chatroom.css">

</head>

<body>
  <span class="body-blur">

    <div class="container clearfix">
      <div class="people-list" id="people-list">
        <div class="button-align-right">
          <span class='user_id_login' style="display: none ;"><?php echo $user_id; ?></span>
          <img class="avatar-user" src=<?php echo $avatar ?> alt="avatar" style="width : 50px;height : 50px;">
          <span class="login-session"><?php echo $login ?></span>
          <a class="logout-position" href='../Signin-signup/signout.php'>Logout</a>
        </div>
        <div class="search">
          <input type="text" id="searching_contact" placeholder="search" />
          <i class="fa fa-search"></i>
        </div>
        <ul class="list-group" style="display: none ;">
          <span class="add-new-group">
            <img src="./database/addConversation.png" style="width : 50px;height : 50px;">
            <span class="start-convo-group">Add new group</span>
          </span>
        </ul>
        <span class="separation-barre"></span>
        <ul class="list">
          <span class='No_contact-in-peoplelist' style="display: none ;">No contact</span>
          <span class="start-conversation-new-contact">
            <img src="./database/addConversation.png" style="width : 50px;height : 50px;">
            <span class="start-convo-text">Add New Contact</span>
          </span>
        </ul>

      </div>

      <div class="chat">
        <div class="chat-header clearfix">
          <img style="width : 60px; height : 60px; visibility:hidden;" id=profile-picture src="" alt="avatar" />
          <div class="chat-about">
            <div class="chat-with"></div>
            <div class="chat-num-messages" style="display:none;">already <span class='nb_message'>0</span> messages</div>
          </div>
          <i class="fa fa-star"></i>
        </div> <!-- end chat-header -->

        <div class="chat-history">
          <ul class="all-messages">
            <span class='No-messages-registred' style="display:none ;"></span>
            <i class="fa fa-circle online"></i>
            <i class="fa fa-circle online" style="color: #AED2A6"></i>
            <i class="fa fa-circle online" style="color:#DAE9DA"></i>
            </li>

          </ul>

        </div> <!-- end chat-history -->

        <div class="chat-message clearfix">
          <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>

          <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
          <i class="fa fa-file-image-o"></i>

          <button id="valid">Send</button>

        </div> <!-- end chat-message -->

      </div> <!-- end chat -->

    </div> <!-- end container -->

    <script src="simpleajax.js"></script>
    <script src="javascript.js"></script>
  </span>
</body>
<div class="AddContact">
  <div class="formPopup" id="popupForm">
    <form class="formContainer">
      <h2 class="please">Enter information new Contact</h2>
      <label for="Nom">
        <strong>Nom</strong>
      </label>
      <input type="text" id="nom" placeholder="Nom" name="nom" required>
      <label for="Prenom">
        <strong>Prenom</strong>
      </label>
      <input type="text" id="prenom" placeholder="Prénom" name="prenom" required>
      <button type="button" class="btn">Valid</button>
      <button type="button" class="btn-cancel">Back</button>
    </form>
  </div>
</div>
<div class="PopupCreateGroupe">
  <div class="formPopup" style="display: none ;" id="popupAddGroup">
    <form action="/action_page.php" class="formContainer">
      <h2 class="Title-indication">Click on the contacts to add them in the group </h2>
      <div class="Info">You cannot add unregistered contacts</div>
      <ul class="ul_list_contacts">
      </ul>
      <label class="nameGroup" for="NameGroup">
        <strong>NameGroup</strong>
      </label>
      <input type="text" id="namegroup" placeholder="Name the discussion channel" name="namegroup" required>
      <div class="viewingContact"></div>
      <button type="button" class="btn-group">Valid</button>
      <button type="button" class="btn-cancel-group">Back</button>
    </form>
  </div>
</div>

</html>