words = ["The", "A", "I", "You", "Thing", "Test", "Is", "Sentence", "Another", "Hello", "World"];

dataset = ["This is a sentence", "This is another sentence", "Hello world"];


function main() {
    console.log("Hello World!");

    let textbox = document.getElementById("main-textbox");

    let button = document.getElementById("button");
    button.onclick = () => {
        console.log(textbox.value);
        console.log(compute_string(textbox.value));
    }
}

/***
 * Does the LLM process for a string
 */
function compute_string(input) {
    input = input.toLowerCase();
    return best_data(tokenize(input));
}


/***
 * Turns an input string into a list of "tokens" (words)
 */
function tokenize(string) {
    return string.split(" ");
}

/***
 * Predicts the best word based on a token
 */
function best_word(token) {

    //Go through the dataset and find the most relevant thing
    let best_count = 0;
    let best_data = "";
    for(const data of dataset) {
        let count = 0;
        for(const word of data.split(" ")) {
            if(word.toLowerCase() == token.toLowerCase()) {
                count++;
            }
        }
        if(count > best_count) {
            best_count = count;
            best_data = data;
        }
    }

    return [best_data, best_count];
}

/**
 * Predicts the best piece of data to return given the tokens
 */
function best_data(tokens) {

    let best_data = "";
    let best_count = 0;
    for(const token of tokens) {
        let data = best_word(token);
        if(data[1] > best_count) {
            best_data = data[0];
            best_count = data[1];
        }
    }

    return best_data;
}

window.onload = main;