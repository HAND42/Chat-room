window.onload = function () {

    //This function checks if the enter key has been pressed

    function verifEntree(e) {
        if (e.key == "Enter") {
            addMessage();
        }
    }



    // ------ ADD MESSAGE IN THE DISCUSSION ----

    function addMessage() {

        function on_success(request) {
            console.log(request.responseText);
            refreshContact_Messages();

        }
        function on_failure(request) {
            console.log(request.responseText);
        }

        let messageToSend = document.querySelector("#message-to-send").value;
        document.querySelector("#message-to-send").value = "";
        let user_id = document.querySelector('.user_id_login').innerHTML;
        let chat_with = document.querySelector('.chat-with').innerHTML;
        let words = chat_with.split(' ');
        let contact_id = chat_with;
        if (words[1] != undefined) {
            contact_id = words[1] + '_' + words[0];
        }

        let nb_message = document.querySelector('.nb_message').innerHTML;


        if (messageToSend != "") {

            let param = "message=" + messageToSend + "&user_id=" + user_id + "&contact_id=" + contact_id + "&nb_message=" + nb_message;
            simpleAjax("ajax/addMessage.php", "post", param, on_success, on_failure);
        }

    }

    let messageToSend = document.querySelector("#message-to-send");
    messageToSend.addEventListener("keyup", verifEntree);

    let valid = document.querySelector("#valid");
    valid.onclick = addMessage;

    //----- OPEN A CONVERSATION IN THE PEOPLE-LIST -----

    function openConversation() {
        function on_success(request) {
            console.log('openConvo');
            //document.querySelector(".No-messages-registred").style.display = "inline";
            document.querySelector('.chat-num-messages').innerHTML = " <span class='nb_message'>0</span> message sent";
            document.querySelector('.chat-num-messages').style.display = "inline";
            refreshContact_Messages();
        }
        function on_failure(request) {
            console.log(request.responseText);
        }
        let name = this.querySelector('.about').querySelector('.name').innerHTML;
        document.querySelector(".chat-with").innerHTML = name;
        document.querySelector('.chat-num-messages').innerHTML = "recherche des messages...";
        document.querySelector('.chat-num-messages').style.display = "inline";
        let img_contact = this.querySelector('.profile-picture').src;
        document.querySelector('#profile-picture').src = img_contact;
        let id = name.split(" ");

        let login = document.querySelector('.login-session').innerHTML;
        let user_id = document.querySelector('.user_id_login').innerHTML;
        let contact_id = name;
        if (id[1] != undefined) {
            contact_id = id[1] + "_" + id[0];
        }
        simpleAjax("ajax/openConversation.php", "post", "contact_id=" + contact_id + "&login=" + login + "&user_id=" + user_id, on_success, on_failure);
    }

    //-------- START CONVERSATION ---------

    function startConversation() {

        document.querySelector(".body-blur").style = "filter: blur(5px);-webkit-filter: blur(5px);-moz-filter: blur(5px);-o-filter: blur(5px);-ms-filter: blur(5px);";

        document.getElementById("popupForm").style.display = "block";
    }

    let button_startConversation = document.querySelector(".start-conversation-new-contact");
    button_startConversation.onclick = startConversation;

    function closeForm() {
        document.getElementById("popupForm").style.display = "none";
        document.getElementById("popupAddGroup").style.display = "none";
        document.querySelector(".body-blur").style = "";


    }

    let button_cancel = document.querySelector(".btn-cancel");
    button_cancel.onclick = closeForm;



    // ------ ADD NEW CONTACT TO USER.JSON ------

    function addNewContact() {
        function on_success(request) {
            let elems = request.responseText.split('_');
            console.log(elems[0] == "0");
            if (elems[0] == "0") {
                console.log("This contact has been added")
                chatHeader();
                refreshContact_Messages();

            }
            else {

            }

        }
        function on_failure(request) {
            console.log(request.responseText);
        }
        document.getElementById("popupForm").style.display = "none";
        document.querySelector(".body-blur").style = "";

        let user_id = document.querySelector(".user_id_login").innerHTML;
        let nom = document.querySelector("#nom").value;
        let prenom = document.querySelector("#prenom").value;

        document.querySelector('#prenom').value = "";
        document.querySelector('#nom').value = "";

        // document.querySelector(".chat-with").innerHTML = "Chat with " + contact_id;
        // document.querySelector(".No_contact-in-peoplelist").style.display = "none";

        simpleAjax("ajax/addNewContact.php", "post", "nom=" + nom + "&prenom=" + prenom + "&user_id=" + user_id, on_success, on_failure);
    }

    document.querySelector(".btn").onclick = addNewContact;

    //-------- CHAT HEADER ----------
    function chatHeader() {
        function on_success(request) {
            //console.log("Changing the chatHeader");
            if (request.responseText == "Pas de contact") {
                document.querySelector('.No_contact-in-peoplelist').style.display = "inline";
                document.querySelector('.chat-with').innerHTML = "Add a new contact in the people list";
                document.querySelector('.chat-num-messages').innerHTML = "";
                document.querySelector("#profile-picture").style.visibility = "hidden";
                document.querySelector(".No-messages-registred").innerHTML = "";

            }
            else {
                let contact = JSON.parse(request.responseText);
                let contact_default = contact[0]['prenom'] + " " + contact[0]['nom'];
                document.querySelector("#profile-picture").src = contact[0]['img'];
                document.querySelector(".No_contact-in-peoplelist").style.display = "none";
                document.querySelector("#profile-picture").style.visibility = "visible";
                document.querySelector('.chat-num-messages').innerHTML = " <span class='nb_message'>0</span> message sent";
                document.querySelector('.chat-num-messages').style.display = "inline";
                document.querySelector(".chat-with").innerHTML = contact_default;
                document.querySelector(".No-messages-registred").innerHTML = "Searching for new messages..."
            }
        }
        function on_failure(request) {
            console.log(request.responseText);
        }

        let user_id = document.querySelector(".user_id_login").innerHTML;
        simpleAjax("ajax/chatHeader.php", "post", "user_id=" + user_id, on_success, on_failure);
    }
    chatHeader();

    //-------- REFRESH CONTACTS ---------

    function refreshContact_Messages() {
        function on_success(request) {
            document.getElementById('searching_contact').value = "";
            document.querySelector(".No_contact-in-peoplelist").style.display = "none";
            console.log("Refresh the contacts_list");
            let nb_contact = 0;
            let data = JSON.parse(request.responseText);
            console.log(data);
            let img_channel = data['img_channel'];
            let channelList = data['channel'];
            let list_group = document.querySelector(".list-group");
            let listOfContact = document.createElement('ul');
            listOfContact.className = "listOfContact";
            list_group.prepend(listOfContact);
            if (list_group) {
                let ancient_clearfix = list_group.querySelectorAll('.clearfix');
                for (j of ancient_clearfix) {
                    j.remove();
                }
            }
            if (channelList.length > 0) {
                for (let i = 0; i < channelList.length; i++) {
                    let new_li_clearfix = document.createElement('li');
                    new_li_clearfix.className = 'clearfix';
                    new_li_clearfix.onclick = openConversation;

                    new_div_about = document.createElement('div');
                    new_div_about.className = 'about';
                    listOfContact.prepend(new_li_clearfix);
                    new_li_clearfix.prepend(new_div_about);

                    let img = document.createElement('img');
                    img.className = "profile-picture";
                    img.src = img_channel;
                    img.style = "width : 50px; height : 50px;";


                    let close_cross = document.createElement("span");
                    close_cross.className = "close";
                    close_cross.innerHTML = "&times;";
                    new_li_clearfix.append(close_cross);
                    close_cross.onclick = deleteConversation;

                    new_li_clearfix.insertBefore(img, new_div_about)

                    new_div_statut = document.createElement('div');
                    new_div_statut.className = "statut";
                    new_div_about.prepend(new_div_statut);

                    new_div_name = document.createElement('div');
                    new_div_name.style = "font-size: 20px;";
                    new_div_name.className = 'name';
                    new_div_name.textContent = channelList[i];

                    new_div_about.insertBefore(new_div_name, new_div_statut);

                    new_i_fa_circle = document.createElement('i');
                    new_i_fa_circle.className = "fa fa-circle me";
                    new_div_statut.textContent = "channel";
                    new_div_statut.style = "font-style: italic;font-style: normal;font-size: 12px;color:#A19EA7;";

                    new_div_statut.prepend(new_i_fa_circle);
                }

            }
            let messages_list = data['message_contact'];
            let contacts_list = data["contact"];
            if (contacts_list == "Pas de contact") {
                chatHeader();
                document.querySelector('.separation-barre').style.display = "none";
                let list = document.querySelector(".list");
                let ancient_clearfix = list.querySelectorAll('.clearfix');
                for (i of ancient_clearfix) {
                    i.remove();
                }
            }
            else {
                let contact = JSON.parse(contacts_list);
                let list = document.querySelector(".list");
                let listOfContact = document.createElement('ul');
                listOfContact.className = "listOfContact";
                list.prepend(listOfContact);
                let ancient_clearfix = list.querySelectorAll('.clearfix');
                for (i of ancient_clearfix) {
                    i.remove();
                }

                contact.forEach(element => {

                    nb_contact++;

                    let new_li_clearfix = document.createElement('li');
                    new_li_clearfix.className = 'clearfix';
                    new_li_clearfix.onclick = openConversation;

                    new_div_about = document.createElement('div');
                    new_div_about.className = 'about';
                    listOfContact.prepend(new_li_clearfix);
                    new_li_clearfix.prepend(new_div_about);

                    let img = document.createElement('img');
                    img.className = "profile-picture";
                    img.src = element['img'];
                    img.style = "width : 50px; height : 50px;";


                    let close_cross = document.createElement("span");
                    close_cross.className = "close";
                    close_cross.innerHTML = "&times;";
                    new_li_clearfix.append(close_cross);
                    close_cross.onclick = deleteConversation;

                    new_li_clearfix.insertBefore(img, new_div_about)

                    new_div_statut = document.createElement('div');
                    new_div_statut.className = "statut";
                    new_div_about.prepend(new_div_statut);

                    new_div_name = document.createElement('div');
                    new_div_name.style = "font-size: 20px;";
                    new_div_name.className = 'name';
                    new_div_name.textContent = element['prenom'] + " " + element['nom'];

                    new_div_about.insertBefore(new_div_name, new_div_statut);

                    new_i_fa_circle = document.createElement('i');
                    new_i_fa_circle.className = "fa fa-circle me";
                    new_div_statut.textContent = element['info'];
                    new_div_statut.style = "font-style: italic;font-style: normal;font-size: 12px;color:#A19EA7;";

                    new_div_statut.prepend(new_i_fa_circle);

                });

                if (nb_contact >= 2 || (channelList.length > 0)) {
                    document.querySelector('.list-group').style.display = "";
                    document.querySelector('.list').style.height = "290px";
                    document.querySelector('.separation-barre').style.display = "block";
                }

                else {
                    document.querySelector('.list-group').style.display = "none";
                    document.querySelector('.list').style.height = "770px";
                    document.querySelector('.separation-barre').style.display = "none";

                }

                if (nb_contact >= 3) {
                    document.querySelector('.list').style.overflowY = "scroll";
                }
                else {
                    document.querySelector('.list').style.overflowY = "";
                }




                if (messages_list == "You haven't talk together yet") {
                    let ul_all_messages = document.querySelector(".all-messages");
                    let ancient_clearfix_msg = ul_all_messages.querySelectorAll('.clearfix');
                    for (i of ancient_clearfix_msg) {
                        i.remove();
                    }
                    document.querySelector(".No-messages-registred").innerHTML = "You haven't talk together yet";
                    document.querySelector(".No-messages-registred").style.display = "inline";
                }

                else {
                    messages = JSON.parse(messages_list);
                    let nb_messages = 0;
                    document.querySelector(".No-messages-registred").style.display = "none";
                    let ul_all_messages = document.querySelector(".all-messages");
                    let ancient_clearfix_msg = ul_all_messages.querySelectorAll('.clearfix');
                    for (i of ancient_clearfix_msg) {
                        i.remove();
                    }
                    messages.forEach(element => {
                        nb_messages++;
                        let new_li_clearfix_msg = document.createElement('li');
                        new_li_clearfix_msg.className = 'clearfix';

                        let new_message_data_align_right = document.createElement('div');
                        if (document.querySelector('.user_id_login').innerHTML == element['user_id']) {
                            new_message_data_align_right.className = "message-data align-right";
                        }
                        else {
                            new_message_data_align_right.className = "message-data";
                        }

                        let message_data_name = document.createElement('span');
                        message_data_name.className = "message-data-name";
                        message_data_name.innerHTML = element['user_id'].split('_')[1];

                        let message_data_time = document.createElement('span');
                        message_data_time.className = "message-data-time";
                        message_data_time.innerHTML = element['date'] + ", Today";

                        let span = document.createElement('span');
                        span.innerHTML = "&nbsp; &nbsp;";

                        let fa_fa_circle_me = document.createElement('i');
                        fa_fa_circle_me.className = "fa fa-circle me";

                        let message_other_message_float_right = document.createElement('div');
                        if (document.querySelector('.user_id_login').innerHTML == element['user_id']) {
                            message_other_message_float_right.className = "message other-message float-right";
                        }
                        else {
                            message_other_message_float_right.className = "message my-message";
                        }

                        message_other_message_float_right.innerHTML = element['message'];
                        console.log(ul_all_messages);
                        ul_all_messages.prepend(new_li_clearfix_msg);
                        new_li_clearfix_msg.prepend(new_message_data_align_right);
                        new_message_data_align_right.appendChild(message_data_time);
                        new_message_data_align_right.appendChild(span);
                        new_message_data_align_right.appendChild(message_data_name);
                        new_message_data_align_right.appendChild(fa_fa_circle_me);
                        new_li_clearfix_msg.appendChild(message_other_message_float_right);

                    });
                    document.querySelector('.chat-num-messages').innerHTML = " <span class='nb_message'>" + nb_messages + "</span> message sent";
                    document.querySelector('.chat-num-messages').style.display = "inline";
                }
            }
        }
        function on_failure(request) {
            console.log(request.responseText);
        }

        let user_id = document.querySelector(".user_id_login").innerHTML;
        let contact_id = document.querySelector('.chat-with').innerHTML;
        if (document.querySelector('.chat-with').innerHTML.split(' ')[1] != undefined) {
            contact_id = document.querySelector('.chat-with').innerHTML.split(' ')[1] + "_" + document.querySelector('.chat-with').innerHTML.split(' ')[0];
        }
        simpleAjax("ajax/refreshContact_Messages.php", "post", "user_id=" + user_id + "&contact_id=" + contact_id, on_success, on_failure);

    }
    refreshContact_Messages();
    setInterval(refreshContact_Messages, 5000);


    //-------- Delete a contact / conversation -------------

    function deleteConversation() {
        function on_success(request) {
            console.log("Delete contact successfully");
            chatHeader();
        }
        function on_failure(request) {
            console.log(request.responseText);
        }
        this.parentNode.remove();
        let contact_id = this.parentNode.querySelector('.name').innerHTML;
        let id = this.parentNode.querySelector('.name').innerHTML.split(' ');
        console.log(id[1] != undefined);
        if (id[1] != undefined) {
            contact_id = id[1] + "_" + id[0];
        }
        console.log(contact_id);
        let user_id = document.querySelector(".user_id_login").innerHTML;
        simpleAjax("ajax/deleteConversation.php", "post", "contact_id=" + contact_id + "&user_id=" + user_id, on_success, on_failure);
    }

    // -----------SEARCH FILTER ---------

    function searchFilter() {

        var input, filter, ul, li, a, i;
        input = document.getElementById('searching_contact');
        filter = input.value.toUpperCase();
        ul = document.querySelector(".list");
        li = ul.querySelectorAll(".clearfix");
        let no_item = 0;
        let nb_contact = li.length;
        li.forEach(item => {
            a = item.querySelector(".name").innerHTML;
            if (a.toUpperCase().indexOf(filter) > -1) {
                item.style.display = "";

            } else {
                item.style.display = "none";
                no_item++;
            }
            if (no_item == nb_contact) {
                document.querySelector('.No_contact-in-peoplelist').style.display = "inline";
                document.querySelector('.No_contact-in-peoplelist').innerHTML = "No items found";

            }
            else {
                document.querySelector('.No_contact-in-peoplelist').style.display = "none";
                document.querySelector('.No_contact-in-peoplelist').innerHTML = "No contact";
            }
        });




    }

    document.querySelector('#searching_contact').onkeyup = searchFilter;

    //-------- Add new group of conversation --------

    function AddNewGroup() {
        function on_success(request) {
            let elems = request.responseText.split('_');
            console.log(elems[0] == "0");
            if (elems[0] == "0") {
                console.log("This contact has been added")
                refreshContact_Messages();
                chatHeader();
            }

        }
        function on_failure(request) {
            console.log(request.responseText);
        }
        document.getElementById("popupForm").style.display = "none";
        document.querySelector(".body-blur").style = "";

        let user_id = document.querySelector(".user_id_login").innerHTML;
        let nom = document.querySelector("#nom").value;
        let prenom = document.querySelector("#prenom").value;
        let contact_id = nom + "_" + prenom;

        document.querySelector('#prenom').value = "";
        document.querySelector('#nom').value = "";

        simpleAjax("ajax/addNewContact.php", "post", "contact_id=" + contact_id + "&nom=" + nom + "&prenom=" + prenom + "&user_id=" + user_id, on_success, on_failure);



    }

    //--------- POP A FORM FOR SELECTING CONTACT TO ADD TO THE CHANNEL ------

    function popUpNewGroup() {
        let contacts = document.querySelector('.list').querySelectorAll('.clearfix');
        let ul_list_contacts = document.querySelector(".ul_list_contacts");
        let ancient_li_contact_to_add = ul_list_contacts.querySelectorAll(".li_contact_to_add");
        for (i of ancient_li_contact_to_add) {
            i.remove();
        }
        for (i of contacts) {
            let name = i.querySelector(".name").innerHTML;
            let li_name_contact = document.createElement('li');
            li_name_contact.className = "li_contact_to_add";
            li_name_contact.style.cursor = "pointer";
            li_name_contact.onclick = selectContact;
            li_name_contact.innerHTML = name;
            ul_list_contacts.append(li_name_contact);
        }


        document.querySelector(".body-blur").style = "filter: blur(5px);-webkit-filter: blur(5px);-moz-filter: blur(5px);-o-filter: blur(5px);-ms-filter: blur(5px);";
        document.querySelector("#popupAddGroup").style.display = "block";

    }

    document.querySelector('.add-new-group').onclick = popUpNewGroup;

    function closeFormGroup() {
        document.getElementById("popupAddGroup").style.display = "none";
        document.querySelector(".body-blur").style = "";


    }

    document.querySelector(".btn-cancel-group").onclick = closeFormGroup;

    //---------Select Contact and Put it in a box --------

    function selectContact() {
        let contactViewing = document.querySelector('.viewingContact');
        if (contactViewing.innerHTML != "") {
            let allDiv = document.querySelectorAll('.Contact_Added_in_the_group');
            for (i of allDiv) {
                console.log(i.innerHTML.split('<')[0])
                if (i.innerHTML.split('<')[0] == this.innerHTML) {
                    i.remove();
                }
            }
        }

        let div = document.createElement('div');
        div.className = "Contact_Added_in_the_group";
        div.style.cursor = "pointer";
        let close_cross = document.createElement('span');
        close_cross.className = "remove_contact_from_list";
        close_cross.onclick = removeOfGroup;
        close_cross.style = 'font-size: 20px;margin-left: 5px;';
        close_cross.innerHTML = "&times";
        div.innerHTML = this.innerHTML;
        div.append(close_cross);
        contactViewing.append(div);
    }

    //------------Remove of group ---------

    function removeOfGroup() {
        this.parentNode.remove();
    }

    //-------validate the creation of the discussion channel------------

    function validateCreationGroup() {

        function on_success(request) {
            console.log(request.responseText);
        }
        function on_failure(request) {
            console.log(request.responseText);
        }

        var arrayContacts = [];
        let j = 0;
        let allContacts = document.querySelector('.viewingContact').querySelectorAll('.Contact_Added_in_the_group');
        for (i of allContacts) {
            arrayContacts.push(i.firstChild.textContent);
            j++;
        }
        let channelName = document.querySelector("#namegroup").value;
        let user_id = document.querySelector(".user_id_login").innerHTML;

        console.log(arrayContacts);

        document.getElementById("popupAddGroup").style.display = "none";
        document.querySelector(".body-blur").style = "";

        simpleAjax("ajax/CreateChannel.php", "post", "chanelName=" + channelName + "&arrayContacts=" + arrayContacts + "&user_id=" + user_id, on_success, on_failure);

    }

    document.querySelector('.btn-group').onclick = validateCreationGroup;

}