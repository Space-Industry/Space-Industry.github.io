var Event_FirstOreCanTriggered = false;

function CanTriggerFirstOre() {
    return Res_Ores === 1;
}

function TriggerFirstOre() {
    AddMessage (L10NMessages[Id_FirstOreMsg][CurL10NMode]);
    Event_FirstOreCanTriggered = false;
    Event_FirstTenOreCanTriggered = true;
}

//-------------

var Event_FirstTenOreCanTriggered = false;

function CanTriggerFirstTenOre() {
    return Res_Ores === 10;
}

function TriggerFirstTenOre() {
    AddMessage (L10NMessages[Id_FirstTenOreMsg][CurL10NMode]);
    Event_FirstTenOreCanTriggered = false;
}