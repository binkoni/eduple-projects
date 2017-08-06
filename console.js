var console = {};
alert("HH");
console.log = function(text) {
    console.output.innerHTML += text + "<br/>";
};
console.clear = function() {
    console.output.innerHTML = "";
};
console.init = function(params) {
    console.input = params.input;
	alert(params.input);
    console.output = params.output;
    console.inputButton = params.inputButton;
    console.input.addEventListener("keydown", function(event) {
        if(event.keyCode == 13) {
	    try {
                eval(console.input.value);
    	    } catch(exception) {
    	        console.log("Error");
    	    } finally {
                console.input.value = "";
	    }
        }
    });
    console.inputButton.addEventListener("click", function(event) {
        if(event.keyCode == 13) {
	    try {
                eval(console.input.value);
    	    } catch(exception) {
    	        console.log("Error");
    	    } finally {
                console.input.value = "";
	    }
        }
    });
};
