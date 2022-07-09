var Event_FirstOreCanTriggered = false;

function CanTriggerFirstOre() {
    return Res_Ores == 1;
}

function TriggerFirstOre() {
    AddMessage ('Amazing!You have got your first ore!Try to get more!');
    Event_FirstOreCanTriggered = false;
    Event_FirstTenOreCanTriggered = true;
}

//-------------

var Event_FirstTenOreCanTriggered = false;

function CanTriggerFirstTenOre() {
    return Res_Ores == 10;
}

function TriggerFirstTenOre() {
    AddMessage ('Great!You have collected 10 ores!Now you can update your mine machine!');
    Event_FirstTenOreCanTriggered = false;
}