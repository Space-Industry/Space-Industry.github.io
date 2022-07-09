var Id_Mine = 'mine';
var Id_Lang = 'lang';
var Id_Reset = 'reset';

function AddOperator(Id, onclick) {
    var operators = document.getElementById('operators');
    var text = document.createTextNode(L10NOperators[Id][CurL10NMode]);
    var para = document.createElement('button');
    para.appendChild(text);
    para.addEventListener('click', onclick);
    if (operators !== null) {
        operators.appendChild(para);
    }
}