var Event_FirstOreCanTriggered = false;
var Id_FirstOre = 'first_ore';
var Event_FirstTenOreCanTriggered = false;
var Id_FirstTenOre = 'first_ten_ore';
var Event_FirstComeCanTriggered = false;
var Id_FirstCome = 'first_come';

//-------------

function GetTrigger(name) {
    if (GetStorage('trigger_' + name) !== null) {
        return GetStorage('trigger_' + name) === 'true';
    }
    return false;
}

function SetTrigger(name, val) {
    SetStorage('trigger_' + name, val ? 'true' : 'false');
}

function InitTriggers() {
    Event_FirstOreCanTriggered = GetTrigger(Id_FirstOre);
    Event_FirstTenOreCanTriggered = GetTrigger(Id_FirstTenOre);
    Event_FirstComeCanTriggered = GetTrigger(Id_FirstCome);
}

//-----------

function CanTriggerFirstCome() {
    return true;
}

function TriggerFirstCome() {
    AddMessage(L10NMessages[Id_FirstComeMsg1][CurL10NMode]);
    AddMessage(L10NMessages[Id_FirstComeMsg2][CurL10NMode]);

    Event_FirstComeCanTriggered = false;
    SetTrigger(Id_FirstCome, Event_FirstComeCanTriggered);

    Event_FirstOreCanTriggered = true;
    SetTrigger(Id_FirstOre, Event_FirstOreCanTriggered);
}

//-----------

function CanTriggerFirstOre() {
    return Res_Ores === 1;
}

function TriggerFirstOre() {
    AddMessage (L10NMessages[Id_FirstOreMsg][CurL10NMode]);

    Event_FirstOreCanTriggered = false;
    SetTrigger(Id_FirstOre, Event_FirstOreCanTriggered);

    Event_FirstTenOreCanTriggered = true;
    SetTrigger(Id_FirstTenOre, Event_FirstTenOreCanTriggered);
}

//-------------

function CanTriggerFirstTenOre() {
    return Res_Ores === 10;
}

function TriggerFirstTenOre() {
    AddMessage (L10NMessages[Id_FirstTenOreMsg][CurL10NMode]);

    Event_FirstTenOreCanTriggered = false;
    SetTrigger(Id_FirstTenOre, Event_FirstTenOreCanTriggered);
}