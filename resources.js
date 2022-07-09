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
            UpdateResource(ResOre);
            UpdateResource(ResFuel);
            UpdateResource(this);
        }
    },
    UpdateId: 'draw_update'
}


function GetRes(res) {
    if (GetStorage('res_' + res.Id) !== '') {
        res.Num = parseInt(GetStorage('res_' + res.Id));
        res.UpdateLevel = parseInt(GetStorage('res_' + res.Id + '_update'));
        return;
    }
    res.Num = 0;
}

function InitResources() {
    GetRes(ResOre);
    GetRes(ResFuel);
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
    SetStorage('res_' + res.Id + "_update", res.UpdateLevel.toString());
}