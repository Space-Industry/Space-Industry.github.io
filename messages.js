Id_FirstComeMsg1 = 'first_come1'
Id_FirstComeMsg2 = 'first_come2'

function InitMessages() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            alert(xmlhttp.responseText);
        }
    }
    xmlhttp.open('Get', 'messages.json');
    xmlhttp.send();
}