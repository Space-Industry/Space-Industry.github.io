var ResOre = {
    Num: 0,
    Id: 'ore',
    Get: function() {
        this.Num ++;
        TryTriggerEvent(EventFirstOre);
        TryTriggerEvent(EventFirstTenOre);
        UpdateResource(this);
    },
    GetId: 'mine'
}

function GetRes(res) {
    if (GetStorage('res_' + res.Id) !== '') {
        res.Num = parseInt(GetStorage('res_' + res.Id));
        return;
    }
    res.Num = 0;
}

function InitResources() {
    GetRes(ResOre);
}

function AddResource(res) {
    var resources = document.getElementById('resources');
    var text = document.createTextNode(L10NResources[res.Id][CurL10NMode] + ':' + res.Num);
    var para = document.createElement('p');
    para.id = 'res_' + res.Id;
    para.appendChild(text);
    if (resources !== null) {
        resources.appendChild(para);
    }
}

function UpdateResource(res) {
    var para = document.getElementById('res_' + res.Id);
    para.innerText = L10NResources[res.Id][CurL10NMode] + ':' + res.Num;
    SetStorage('res_' + res.Id, res.Num.toString());
}