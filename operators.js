var Id_Lang = 'lang';
var Id_Reset = 'reset';

function AddOperator(Id, onclick, line, column, width, height) {
    var operators = document.getElementById('operators');
    var text = document.createTextNode(L10NOperators[Id][CurL10NMode]);
    var button = document.createElement('button');
    button.appendChild(text);
    button.addEventListener('click', onclick);
    button.style.position = 'absolute';
    button.style.top    = (line   * 20).toString() + 'px';
    button.style.left   = (column * 20).toString() + 'px';
    button.style.width  = (width  * 20).toString() + 'px';
    button.style.height = (height * 20).toString() + 'px';
    if (operators !== null) {
        operators.appendChild(button);
    }
}