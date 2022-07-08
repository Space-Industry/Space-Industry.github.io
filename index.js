function Init() {
    AddMessage('Welcome to Space Industry!');
    AddMessage('Click the \'mine\' button to get you first ore!');
    AddButton('mine');
    AddResource('ore');
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

Res_Ores = 0;

function DoMine() {
    Res_Ores ++;
    UpdateResource('ore', Res_Ores);
}

function AddButton(msg) {
    var operators = document.getElementById('operators');
    var text = document.createTextNode(msg);
    var para = document.createElement('button');
    para.appendChild(text);
    para.addEventListener('click', DoMine);
    if (operators !== null) {
        operators.appendChild(para);
    }
}

function AddResource(name) {
    var resources = document.getElementById('resources');
    var text = document.createTextNode(name + ':0');
    var para = document.createElement('p');
    para.id = 'res_' + name;
    para.appendChild(text);
    if (resources !== null) {
        resources.appendChild(para);
    }
}

function UpdateResource(name, value) {
    var para = document.getElementById('res_' + name);
    para.innerText = name + ':' + value;
}