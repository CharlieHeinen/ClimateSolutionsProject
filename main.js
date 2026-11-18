var dataset = new Map();
dataset.set("This is a response", ["Keyword", "Key",  "Words"]);
for(let i=0;i<100;i++) {
    dataset.set("Test " + i.toString(), ["None"])
}

//Settings go here
var test_setting = 0
var dataset_size = 1

function main() {
    console.log("Hello World!");

    let textbox = document.getElementById("main-textbox");
    let button = document.getElementById("button");
    let response_div = document.getElementById("response")

    generate_dataset_html()

    button.onclick = () => {
        console.log(textbox.value);

        update_settings()
        update_dataset()
        //console.log(test_setting)
        //console.log(dataset)

        let response = generate_response(textbox.value)

        response_div.innerHTML = response

        update_stats()

        console.log(response);
    }
}

/**
 * Called when the website loads to set the dataset to the predefined one.
 */
function generate_dataset_html() {
    let dataset_div = document.getElementById("dataset")

    for (const [response, keywords] of dataset) {
        let new_div = document.createElement("div")
        new_div.classList.add("dataset-entry")
        let new_response_div = document.createElement("div")
        new_response_div.classList.add("dataset-response")
        let new_keywords_div = document.createElement("div")
        new_keywords_div.classList.add("dataset-keywords")

        let new_response_text = document.createElement("textarea")
        let new_keywords_text = document.createElement("textarea")

        new_response_text.value = response
        new_keywords_text.value = keywords.toString()

        new_response_div.appendChild(new_response_text)
        new_keywords_div.appendChild(new_keywords_text)

        new_div.appendChild(new_response_div)
        new_div.appendChild(new_keywords_div)

        dataset_div.appendChild(new_div)
    }
}

/**
 * Updates the dataset based on the HTML file.
 * Called when generating a response
 */
function update_dataset() {
    let dataset_div = document.getElementById("dataset")

    dataset = new Map()

    for (const child of dataset_div.children) {
        response = child.children[0].children[0].value
        keywords = child.children[1].children[0].value.split(",")
        dataset.set(response, keywords)
    }
}

/**
 * Called when generating a response to update setting values
 */
function update_settings() {
    test_setting = parseInt(document.getElementById("setting-test").value)
    dataset_size = parseInt(document.getElementById("setting-dataset-size").value)
}

/**
 * Does the "LLM" process to get a response for an input
 */
function generate_response(input) {
    let tokens = tokenize(input)
    let response = best_response(tokens)
    if (response == "") {
        return "I don't seem to have an answer for that. Try asking something else."
    }
    return response
}

/***
 * Turns an input string into a list of "tokens" (words)
 */
function tokenize(string) {
    return string.split(" ");
}


/**
 * Gets the best response based on the tokens (keywords).
 * It simply gets the premade response with the most keywords in it.
 */
function best_response(tokens) {
    let best_response = "";
    let best_count = 0;
    for (let i=0;i<dataset_size;i++) {
        for (const [response, keywords] of dataset) {
            let count = 0;
            for (const word of response.split(" ")) {
                if (tokens.includes(word.trim().toLowerCase())) {
                    count += 1;
                }
            }
            for (const keyword of keywords) {
                if (tokens.includes(keyword.trim().toLowerCase())) {
                    count += 3;
                }
            }
            if (count > best_count) {
                best_response = response
            }
        }
    }

    return best_response;
}

function update_stats() {
    document.getElementById("stat-dataset-size").innerHTML = dataset.size * dataset_size
}

window.onload = main;