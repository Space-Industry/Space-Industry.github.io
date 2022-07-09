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
    Update: function() {
        if (ResOre.Num >= this.CalcUpdateCostOres()) {
            ResOre.Num -= this.CalcUpdateCostOres();

            this.UpdateLevel ++;
            UpdateResource(this);
        }
    },
    UpdateId: 'mine_update'
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
}

function MakeText(res) {
    if (OperatorUpdateLock.unlocked) {
        return L10NResources[res.Id][CurL10NMode] + ':' + res.Num.toString() + '(' +
            L10NMiscs[Id_Level][CurL10NMode] + ':' + res.UpdateLevel.toString() + ', ' +
            L10NMiscs[Id_UpdateCost][CurL10NMode] + ': ['
                + L10NResources[res.Id][CurL10NMode] + ':' + res.CalcUpdateCostOres().toString() +
            ']' +
        ')';
    }
    else {
        return L10NResources[res.Id][CurL10NMode] + ':' + res.Num.toString();
    }
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