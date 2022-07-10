function Init() {
    if (GetStorage('trigger_' + EventFirstCome.Id) === '') {
        SetTrigger(EventFirstCome, true);
    }

    InitResources();
    InitStorage();
    InitL10N();
    InitEvents();
    InitLocks();

    AddOperator(Id_Lang,     ChangeLang,                   1,  1,  8,  1);
    AddOperator(Id_Reset,    Reset,                        1,  10,  4,  1);

    TryTriggerEvent(EventFirstCome);
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
    if (EventFirstOre.CanTriggered) {
        SetTrigger(EventFirstCome, true);
    }
    location.reload();
}

function Reset() {
    localStorage.clear();
    SetStorage('lang', CurL10NMode);
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