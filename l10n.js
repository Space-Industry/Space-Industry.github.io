var L10NObject = null;
var L10NMessages = null;
var L10NResources = null;
var L10NOperators = null;

var CurL10NMode = 'en_us';
var transfer_over = false;

function InitL10N() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            L10NObject = JSON.parse(xmlhttp.responseText);
            L10NMessages = L10NObject.messages;
            L10NResources = L10NObject.resources;
            L10NOperators = L10NObject.operators;
        }
    };
    xmlhttp.open('Get', 'l10n.json', async = false);
    xmlhttp.send();
    if (GetStorage('lang') === '') {
        SetStorage('lang', CurL10NMode);
    }
    else {
        CurL10NMode = GetStorage('lang');
    }
}