var console = {};
console.log = function(text) {
    console.output.innerHTML += text + "<br/>";
};
console.clear = function() {
    console.output.innerHTML = "";
};
console.init = function(params) {
    console.input = params.input;
    console.output = params.output;
    console.inputButton = params.inputButton;
    console.inputButton.addEventListener("click", function(event) {
        eval(console.input.value);
        console.input.value = "";
    });
};
console.input.addEventListener("keydown", function(event) {
    if(event.keyCode == 13) {
        try {
            eval(console.input.value);
            console.input.value = "";
        } catch(exception) {
            print(exception);
        }
    }
});

