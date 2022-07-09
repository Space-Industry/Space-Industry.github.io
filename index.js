function Init() {
    InitMessages();
    AddMessage('Welcome to Space Industry!');
    AddMessage('Click the \'mine\' button to get you first ore!');
    AddOperator('mine', DoMine);
    AddResource('ore');
    Event_FirstOreCanTriggered = true;
    Event_FirstTenOreCanTriggered = true;
}

function AddMessage(msg) {
    var messages = document.getElementById('messages');
    var text = document.createTextNode(msg);
    var para = document.createElement('p');
    para.appendChild(text);
    if (messages !== null) {
        messages.appendChild(para);
    }
}

function AddOperator(msg, onclick) {
    var operators = document.getElementById('operators');
    var text = document.createTextNode(msg);
    var para = document.createElement('button');
    para.appendChild(text);
    para.addEventListener('click', DoMine);
    if (operators !== null) {
        operators.appendChild(para);
    }
}