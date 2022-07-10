var ResOre = {
    Num: 0,
    Id: 'ore',
    Get: function() {
        this.Num += this.UpdateLevel;
        TryTriggerEvent(EventFirstOre);
        TryTriggerEvent(EventFirstTenOre);
        UpdateResource(this);
    },
    GetId: 'mine_get',
    UpdateLevel: 1,
    AutoMachines: 0,
    CalcUpdateCostOres: function() {
        return 10 + Math.trunc(((this.UpdateLevel - 1) ** 2) / 3);
    },
    CalcUpdateCostFuels: function() {
        if (this.UpdateLevel < 5) {
            return 0;
        }
        return 15 + Math.trunc(((this.UpdateLevel - 5) ** 2) / 2.5);
    },
    Update: function() {
        if (ResOre.Num >= this.CalcUpdateCostOres()) {
            if (ResFuelLock.unlocked) {
                if (! (ResFuel.Num >= this.CalcUpdateCostFuels())) {
                    return;
                }
                ResFuel.Num -= this.CalcUpdateCostFuels();
                UpdateResource(ResFuel);
            }

            ResOre.Num -= this.CalcUpdateCostOres();

            this.UpdateLevel ++;
            TryTriggerEvent(EventLevel5Mine);

            UpdateResource(ResOre);
            UpdateResource(this);
        }
    },
    CalcBuyCostOres: function() {
        return 36 + Math.trunc(((this.AutoMachines - 4) ** 2) / 2.6);
    },
    CalcBuyCostFuels: function() {
        return 36 + Math.trunc(((this.AutoMachines - 4) ** 2) / 2.8);
    },
    Buy: function() {
        if (ResOre.Num >= this.CalcBuyCostOres() &&
            ResFuel.Num >= this.CalcBuyCostFuels()) {

            ResOre.Num -= this.CalcBuyCostOres();
            ResFuel.Num -= this.CalcBuyCostFuels();

            this.AutoMachines ++;

            UpdateResource(ResOre);
            UpdateResource(ResFuel);
            UpdateResource(this);
        }
    },
    UpdateId: 'mine_update'
}

var ResFuel = {
    Num: 0,
    Id: 'fuel',
    Get: function() {
        this.Num += this.UpdateLevel;
        UpdateResource(this);
    },
    GetId: 'draw_get',
    UpdateLevel: 1,
    AutoMachines: 0,
    CalcUpdateCostOres: function() {
        return 20 + Math.trunc(((this.UpdateLevel - 1) ** 2) / 2.5);
    },
    CalcUpdateCostFuels: function() {
        return 20 + Math.trunc(((this.UpdateLevel - 1) ** 2) / 2.7);
    },
    Update: function() {
        if (ResOre.Num >= this.CalcUpdateCostOres() &&
            ResFuel.Num >= this.CalcUpdateCostFuels()) {

            ResOre.Num -= this.CalcUpdateCostOres();
            ResFuel.Num -= this.CalcUpdateCostFuels();

            this.UpdateLevel ++;
            TryTriggerEvent(EventLevel5Collector);

            UpdateResource(ResOre);
            UpdateResource(ResFuel);
            UpdateResource(this);
        }
    },
    CalcBuyCostOres: function() {
        return 44 + Math.trunc(((this.AutoMachines - 4) ** 2) / 2.3);
    },
    CalcBuyCostFuels: function() {
        return 44 + Math.trunc(((this.AutoMachines - 4) ** 2) / 2.5);
    },
    Buy: function() {
        if (ResOre.Num >= this.CalcBuyCostOres() &&
            ResFuel.Num >= this.CalcBuyCostFuels()) {

            ResOre.Num -= this.CalcBuyCostOres();
            ResFuel.Num -= this.CalcBuyCostFuels();

            this.AutoMachines ++;

            UpdateResource(ResOre);
            UpdateResource(ResFuel);
            UpdateResource(this);
        }
    },
    UpdateId: 'draw_update'
}

function GetNum(name) {
    var value = GetStorage(name);
    return value === '' ? 0 : parseInt(value);
}

function GetRes(res) {
    if (GetStorage('res_' + res.Id) !== '') {
        res.Num = GetNum('res_' + res.Id);
        res.UpdateLevel = GetNum('res_' + res.Id + '_update');
        res.AutoMachines = GetNum('res_' + res.Id + '_machine');
        return;
    }
    res.Num = 0;
}

function CalcAutomachineGet(res) {
    return res.AutoMachines * res.UpdateLevel;
}

function InitResources() {
    GetRes(ResOre);
    GetRes(ResFuel);

    setInterval(function() {
        if (AutoMachineLock.unlocked) {
            ResOre.Num += CalcAutomachineGet(ResOre);
            UpdateResource(ResOre);

            ResFuel.Num += CalcAutomachineGet(ResFuel);
            UpdateResource(ResFuel);
        }
    }, 5000);
}

function MakeText(res) {
    var text = L10NResources[res.Id][CurL10NMode] + ':' + res.Num.toString();

    if (OperatorUpdateLock.unlocked) {
        text += '(' + L10NMiscs[Id_Level][CurL10NMode] + ':' + res.UpdateLevel.toString() + ', ' +
            L10NMiscs[Id_UpdateCost][CurL10NMode] + ': [';

        if (res.CalcUpdateCostOres() !== 0) {
            text += L10NResources[ResOre.Id][CurL10NMode] + ':' + res.CalcUpdateCostOres().toString();
        }

        if (res.CalcUpdateCostFuels() !== 0) {
            text += L10NResources[ResFuel.Id][CurL10NMode] + ':' + res.CalcUpdateCostFuels().toString();
        }

        text += ']' + ')';
    }

    if (AutoMachineLock.unlocked) {
        text += '(+' + CalcAutomachineGet(res).toString() + ' ' + L10NMiscs[Id_PerFiveSecond][CurL10NMode] + ', '+
        L10NMiscs[Id_BuyCost][CurL10NMode] + ': [';

        if (res.CalcBuyCostOres() !== 0) {
            text += L10NResources[ResOre.Id][CurL10NMode] + ':' + res.CalcBuyCostOres().toString();
        }

        if (res.CalcBuyCostFuels() !== 0) {
            text += L10NResources[ResFuel.Id][CurL10NMode] + ':' + res.CalcBuyCostFuels().toString();
        }

        text += ']' + ')';
    }
    return text;
}

function AddResource(res) {
    var resources = document.getElementById('resources');
    var text = document.createTextNode(MakeText(res));
    var para = document.createElement('p');
    para.id = 'res_' + res.Id;
    para.appendChild(text);
    if (resources !== null) {
        resources.appendChild(para);
    }
}

function UpdateResource(res) {
    var para = document.getElementById('res_' + res.Id);
    para.innerText = MakeText(res);
    SetStorage('res_' + res.Id, res.Num.toString());
    SetStorage('res_' + res.Id + '_update', res.UpdateLevel.toString());
    SetStorage('res_' + res.Id + '_machine', res.AutoMachines.toString());
}