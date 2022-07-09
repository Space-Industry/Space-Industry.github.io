function Init() {
    if (GetStorage('trigger_' + Id_FirstCome) === '') {
        Event_FirstComeCanTriggered = true;
        SetTrigger(Id_FirstCome, Event_FirstComeCanTriggered);
    }

    InitResources();
    InitStorage();
    InitL10N();
    InitTriggers();

    AddOperator(Id_Mine, DoMine);
    AddOperator(Id_Lang, ChangeLang);
    AddOperator(Id_Reset, Reset);

    AddResource(Id_Ore, Res_Ores);

    if (Event_FirstComeCanTriggered) {
        TriggerFirstCome();
    }
}

function ChangeLang() {
    if (GetStorage('lang') === 'en_us') {
        SetStorage('lang', 'zh_cn');
        CurL10NMode = 'zh_cn';
    }
    else if (GetStorage('lang') === 'zh_cn') {
        SetStorage('lang', 'en_us');
        CurL10NMode = 'en_us';
    }
    if (Event_FirstOreCanTriggered) {
        Event_FirstComeCanTriggered = true;
        SetTrigger(Id_FirstCome, Event_FirstComeCanTriggered);
    }
    location.reload();
}

function Reset() {
    localStorage.clear();
    location.reload();
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