
import { Stack } from './stack.js';


//this controls the use of ctrl/cmd buttons n windows/mac because in this simple editor my
//goal is to demonstrate undo operation only and hence copy/paste are avoided.
document.onkeydown = function(event) {
    if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
    }
};

onload = function () {
    // Get reference to elements
    const textbox = document.getElementById('comment');
    const undo = document.getElementById('undo');
    const clear = document.getElementById('clear');

    textbox.value = "";
    let text = "";
    let stack = new Stack();

    //this function will prevent cursor by user to be in middle of sentences and cursor will always be at end as
    //only writing at end in allowed in this implementation.
    textbox.onclick = function () {
        textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
    };

    clear.onclick = function () {
        stack.clear();
        text = "";
        textbox.value = "";
    };


    //event variable stores the info about whether user inputs or deletes some characters in the text box
    textbox.oninput = function(event){
        // console.log(event);
        switch(event.inputType){
            case "insertText":
                stack.push(0, event.data);
                break;
            case "deleteContentBackward":
                stack.push(1, text[text.length-1]);
                break;
        }
        text = textbox.value;
    };

    undo.onclick = function () {
        let operation = stack.pop();
        if(operation[0]!==-1){
            if(operation[0] === 0){
                let len = operation[1].length;
                textbox.value = textbox.value.substring(0,textbox.value.length-len);
            } else{
                textbox.value += operation[1];
            }
            text = textbox.value;
        }
    };

};