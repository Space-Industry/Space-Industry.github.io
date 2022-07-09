function Init() {
    InitResources();
    InitStorage();
    InitL10N();
    AddMessage(L10NMessages[Id_FirstComeMsg1][CurL10NMode]);
    AddMessage(L10NMessages[Id_FirstComeMsg2][CurL10NMode]);
    AddOperator(Id_Mine, DoMine);
    AddOperator(Id_Lang, ChangeLang);
    AddResource(Id_Ore, Res_Ores);
    Event_FirstOreCanTriggered = true;
    Event_FirstTenOreCanTriggered = true;
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