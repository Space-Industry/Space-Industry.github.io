var ResOreLock = {
    Id: 'res_ore',
    unlocked: false,
    Unlock: function() {
        this.unlocked = true;

        AddOperator(ResOre.GetId, function() {ResOre.Get();},  2,  1,  4,  1);
        AddResource(ResOre);
    }
}

var OperatorUpdateLock = {
    Id: 'operator_update',
    unlocked: false,
    Unlock: function() {
        this.unlocked = true;

        AddOperator(ResOre.UpdateId, function() {ResOre.Update();}, 2, 6, 8, 1);
        UpdateResource(ResOre);
    }
}

var ResFuelLock = {
    Id: 'res_fuel',
    unlocked: false,
    Unlock: function() {
        this.unlocked = true;

        AddOperator(ResFuel.GetId, function() {ResFuel.Get();},  3,  1,  4,  1);
        AddOperator(ResFuel.UpdateId, function() {ResFuel.Update();}, 3, 6, 8, 1);
        AddResource(ResFuel);
    }
}

function MakeBuyText(res) {
    return L10NOperators[Id_Buy][CurL10NMode] + L10NOperators[res.GetId][CurL10NMode] + L10NMiscs[Id_AutoMachine][CurL10NMode];
}

var AutoMachineLock = {
    Id: 'auto_machine',
    unlocked: false,
    Unlock: function() {
        this.unlocked = true;

        AddOperatorWithName(MakeBuyText(ResOre), function() {
            ResOre.Buy()
        }, 2, 15, 5, 1);

        AddOperatorWithName(MakeBuyText(ResFuel), function() {
            ResFuel.Buy()
        }, 3, 15, 5, 1);

        UpdateResource(ResOre);
        UpdateResource(ResFuel);
    }
}

function Unlock(lock) {
    SetStorage('lock_' + lock.Id, 'true');
    lock.Unlock();
}

function TryUnlock(lock) {
    if (GetStorage('lock_' + lock.Id) === 'true') {
        lock.Unlock();
    }
}

function InitLocks() {
    TryUnlock(ResOreLock);
    TryUnlock(OperatorUpdateLock);
    TryUnlock(ResFuelLock);
    TryUnlock(AutoMachineLock);
}