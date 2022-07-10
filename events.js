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

        Unlock(ResOreLock);
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
        SetTrigger(EventLevel5Mine, true);

        Unlock(OperatorUpdateLock);
    }
};

var EventLevel5Mine = {
    CanTriggered: false,
    Id: 'level_5_mine',
    CanTrigger: function() {
        return this.CanTriggered && ResOre.UpdateLevel == 5;
    },
    WhenTrigger: function() {
        AddMessage (L10NMessages[this.Id][CurL10NMode]);

        SetTrigger(EventLevel5Mine, false);
        SetTrigger(EventLevel5Collector, true);

        Unlock(ResFuelLock);
    }
};

var EventLevel5Collector = {
    CanTriggered: false,
    Id: 'level_5_collector',
    CanTrigger: function() {
        return this.CanTriggered && ResFuel.UpdateLevel == 5;
    },
    WhenTrigger: function() {
        AddMessage (L10NMessages[this.Id][CurL10NMode]);

        SetTrigger(EventLevel5Collector, false);

        Unlock(AutoMachineLock);
    }
}

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
    GetTrigger(EventLevel5Mine);
}

function TryTriggerEvent(event) {
    if (event.CanTrigger()) {
        event.WhenTrigger();
    }
}