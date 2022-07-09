function InitStorage() {
    if (typeof(Storage) === 'undefined') {
        alert ('Your browser don\'t support web storage!');
    }
}

function SetStorage(cname, cvalue) {
    localStorage.setItem(cname, cvalue);
}

function GetStorage(cname) {
    var cvalue = localStorage.getItem(cname);
    return cvalue === null ? '' : cvalue;
}