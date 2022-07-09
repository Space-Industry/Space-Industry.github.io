var EventFirstCome = {
    CanTriggered: false,
    Id: 'first_come',
    CanTrigger: function() {
        return this.CanTriggered;
    },
    WhenTrigger: function() {
        AddMessage(L10NMessages[this.Id + '1'][CurL10NMode]);
        AddMessage(L10NMessages[this.Id + '2'][CurL10NMode]);
        SetTrigger(EventFirstCome, false);
        SetTrigger(EventFirstOre, true);
    }
};

var EventFirstOre = {
    CanTriggered: false,
    Id: 'first_ore',
    CanTrigger: function() {
        return this.CanTriggered && ResOre.Num === 1;
    },
    WhenTrigger: function() {
        AddMessage (L10NMessages[this.Id][CurL10NMode]);
        SetTrigger(EventFirstOre, false);
        SetTrigger(EventFirstTenOre, true);
    }
};

var EventFirstTenOre = {
    CanTriggered: false,
    Id: 'first_ten_ore',
    CanTrigger: function() {
        return this.CanTriggered && ResOre.Num === 10;
    },
    WhenTrigger: function() {
        AddMessage (L10NMessages[this.Id][CurL10NMode]);
        SetTrigger(EventFirstTenOre, false);
    }
};

//-------------

function GetTrigger(event) {
    if (GetStorage('trigger_' + event.Id) !== null) {
        event.CanTriggered = (GetStorage('trigger_' + event.Id) === 'true');
        return;
    }
    event.CanTriggered = false;
}

function SetTrigger(event, val) {
    event.CanTriggered = val;
    SetStorage('trigger_' + event.Id, val ? 'true' : 'false');
}

function InitEvents() {
    GetTrigger(EventFirstOre);
    GetTrigger(EventFirstTenOre);
    GetTrigger(EventFirstCome);
}

function TryTriggerEvent(event) {
    if (event.CanTrigger()) {
        event.WhenTrigger();
    }
}