var Res_Ores = 0;

var Event_FirstOreCanTriggered = false;
var Event_FirstTenOreCanTriggered = false;

function Init() {
    AddMessage('Welcome to Space Industry!');
    AddMessage('Click the \'mine\' button to get you first ore!');
    AddButton('mine');
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

function CanTriggerFirstOre() {
    return Res_Ores == 1;
}

function TriggerFirstOre() {
    AddMessage ('Amazing!You have got your first ore!Try to get more!');
    Event_FirstOreCanTriggered = false;
    Event_FirstTenOreCanTriggered = true;
}

function CanTriggerFirstTenOre() {
    return Res_Ores == 10;
}

function TriggerFirstTenOre() {
    AddMessage ('Great!You have collected 10 ores!Now you can update your mine machine!');
    Event_FirstTenOreCanTriggered = false;
}

function DoMine() {
    Res_Ores ++;
    if (Event_FirstOreCanTriggered && CanTriggerFirstOre()) {
        TriggerFirstOre();
    }
    if (Event_FirstTenOreCanTriggered && CanTriggerFirstTenOre()) {
        TriggerFirstTenOre();
    }
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