var Res_Ores = 0;
var Id_Ore = 'ore';

function InitResources() {
    if (GetStorage('res_' + Id_Ore) !== '') {
        Res_Ores = parseInt(GetStorage('res_' + Id_Ore));
    }
}

function DoMine() {
    Res_Ores ++;
    if (Event_FirstOreCanTriggered && CanTriggerFirstOre()) {
        TriggerFirstOre();
    }
    if (Event_FirstTenOreCanTriggered && CanTriggerFirstTenOre()) {
        TriggerFirstTenOre();
    }
    UpdateResource(Id_Ore, Res_Ores);
}

function AddResource(Id, val) {
    var resources = document.getElementById('resources');
    var text = document.createTextNode(L10NResources[Id][CurL10NMode] + ':' + val);
    var para = document.createElement('p');
    para.id = 'res_' + Id;
    para.appendChild(text);
    if (resources !== null) {
        resources.appendChild(para);
    }
}

function UpdateResource(Id, value) {
    var para = document.getElementById('res_' + Id);
    para.innerText =  L10NResources[Id][CurL10NMode] + ':' + value;
    SetStorage('res_' + Id, value.toString());
}