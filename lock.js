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
}