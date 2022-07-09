var Res_Ores = 0;
var Ore_Name = 'ore'

function DoMine() {
    Res_Ores ++;
    if (Event_FirstOreCanTriggered && CanTriggerFirstOre()) {
        TriggerFirstOre();
    }
    if (Event_FirstTenOreCanTriggered && CanTriggerFirstTenOre()) {
        TriggerFirstTenOre();
    }
    UpdateResource(Ore_Name, Res_Ores);
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