var dataset = new Map();
dataset.set("This is a response", ["Keyword", "Key",  "Words"]);
dataset.set("The average power used by AI data centers vary depending on how big they are. This can range from as low as ~50 megawtts per year, to over 1000 megawatts per year! Every 50 megawtts is enough to power over 20,000 homes!", ["power", "energy", "average", "use", "usage", "electricity"])
dataset.set("In 2024, the United States used ~82 terrawatt hours of electricity to power AI data centers, accounting for ~1.8% of all US electricity use! That's more than some small countries use!", ["total", "use", "usage", "energy", "electricity", "power"])
dataset.set("A study analyzing 403 AI data centers in the US found that they generated a total of ~26 million tons of CO2 per year. This means each one is responsible for around 64 thousand tons of CO2 per year. In total, these AI data centers accounted for ~0.5% of the country's total CO2 emissions.", ["CO2", "carbon", "emissions", "emitted", "gas", "gasses", "greenhouse"])
dataset.set("One of the biggest ways that AI data centers impact the environment is how they release a lot of carbon dioxide (CO2). These data centers require a lot of electricity, which mostly comes from non-renewable sources like natural gas and coal. Burning these fossil fules releases gases like CO2 into the atmosphere. This contributes to the greenhouse effect, where heat gets trapped in the atmosphere, causing global tempreatures to slowly rise.", ["gases", "gas", "CO2", "emissions", "environment", "impact", "environmental", "climate", "warming", "affect"])
dataset.set("Most AI data centers in the US get around 40% of their power from natural gas, 15% from coal, and 45% from clean sources (nuclear, solar, wind, etc). This is no good because around 55% of their power comes from non-renewable fossil fuels.", ["sources", "power", "mix", "grid", "renewable", "coal", "gas", "resources", "electricity", "energy", "get", "from"])
dataset.set("AI data centers have A LOT of data! Some AI models have petabytes (1,000,000 gigabytes) of data in their datasets! Since our devices can't handle that much, a good estimate to use is 10,000,000 dataset entries (~1 gigabyte). This is only 0.0001% of a petabyte!", ["amount", "much", "data", "keywords", "words", "dataset", "set", "response", "responses", "size", "big"])
dataset.set("The dataset size multiplier setting can be used make the size of the dataset bigger. It will copy the dataset however many times you tell it to, causing the code to run slower.", ["dataset", "data", "set", "size", "change", "multiplier", "multiplier"])
dataset.set("One AI prompt uses about 0.3 watt-hours of electricity and releases about 0.03-0.20 grams of CO2. This isn't a lot, but given the number of users and additional power needed to run the data center, it adds up quickly!", ["one", "single", "response", "prompt", "effects", "1", "electricity", "power", "energy", "emissions", "CO2", "carbon", "emitted"])
dataset.set("Popular AI platforms can reach up to a billion active users per month! Some of these platforms are very heavily used, like ChatGPT, which claims to get ~2.5 billion prompts per day!", ["active", "users", "monthly", "month", "day", "people", "prompts", "many", "amount"])
dataset.set("The Power Usage Efficiency (PUE) of a data center measures how much energy is used for computing versus other aspects of powering the center. A lower score means the data center uses most of its power towards computing. However, lowering this value does not directly change the amount of power the data center uses, so it may not have a significant impact on total emissions.", ["PUE", "power", "usage", "use", "efficiency", "efficiency"])
dataset.set("Requiring data centers to get a specific amount of their energy from clean sources is a great way to lower their emissions! This will make data centers use less fossil fuels like natural gas, leading to lower emissions and less contributions to climate change! If you'd like, I can give you some suggestions on how to implement these regulations!", ["solution", "renewable", "clean", "energy", "required", "%", "percent", "solutions", "requirements", "require"])
dataset.set("Implementing regulations to require AI data centers to use renewable energy can be done by creating laws at the state or local level to require new AI data centers. Governments can require these centers to use a certain amount of clean energy, or place restrictions on how much fossil fuels they can use.", ["regulations", "implement", "policy", "law", "change", "percent", "%", "renewable", "regulation"])
dataset.set("One of the biggest challenges to requiring AI data centers to use renewable energy sources is preventing them from just building the data center somewhere else without those regulations. The goal of the AI companies is to make money, and if a location requires spending money on clean energy, they will want to put their data center somewhere else.", ["challenges", "challenges", "pushback", "companies", "corporations", "resist", "implement", "regulations", "laws", "policy", "challenge"])
dataset.set("Industrial Development Agencies (IDA\'s) are a great way to encourage data centers to follow regulations! IDA's allow states to provide incentives like tax breaks when projects follow their rules. Having IDAs would make it much more likely for a data center to follow guidelines for renewable energy since it would mean they get financial incetives and make more money.", ["IDA", "IDA", "IDAs", "IDAs", "Industrial", "Development", "Authority", "Agency", "Agencies", "Authorities", "help"])
for(let i=0;i<(100-16);i++) {
    dataset.set("Test " + i.toString(), ["None"])
}

//Settings go here
var active_users = 1
var dataset_size = 1
var percent_renewable = 45
var ida = false
var time_difference = 0

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

        let start_time = new Date()

        let response = generate_response(textbox.value)

        let end_time = new Date()
        time_difference = end_time.getTime() - start_time.getTime()

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
    active_users = parseInt(document.getElementById("setting-users").value)
    dataset_size = parseInt(document.getElementById("setting-dataset-size").value)
    percent_renewable = parseInt(document.getElementById("setting-percent-renewable").value)
    ida = document.getElementById("setting-ida").checked
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
    return string.split(" ")
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
            //console.log(count)
            //console.log(response)
            if (count > best_count) {
                best_count = count
                best_response = response
            }
        }
    }

    return best_response;
}

/**
 * Updates the stats after doing a prompt. 
 * Calculates new values based on the settings
 */
function update_stats() {
    document.getElementById("stat-time").innerHTML = time_difference / 1000
    document.getElementById("stat-dataset-size").innerHTML = dataset.size * dataset_size
    document.getElementById("stat-dataset-gb").innerHTML = ((dataset.size * dataset_size) / 10000000)

    document.getElementById("stat-users").innerHTML = active_users
    document.getElementById("stat-prompts").innerHTML = Math.round(active_users * 2.5)

    document.getElementById("stat-power").innerHTML = 0.3
    document.getElementById("stat-emissions").innerHTML = 0.03

    document.getElementById("stat-power-day").innerHTML = Math.round(0.3 * active_users * 2.5)

    let fossil_fuels = 55
    let renewable = 45

    if (percent_renewable >= 90) {
        //too high to have effect
        document.getElementById("stat-percent-extra").innerHTML = "It seems like your desired percentage of renewable energy was too high to implement! Try a slightly lower value."
    } else if (percent_renewable > 45) {
        //can have effect if IDA's exist
        if (ida) {
            renewable = percent_renewable
            fossil_fuels = 100 - renewable
            document.getElementById("stat-percent-extra").innerHTML = " "
        } else {
            document.getElementById("stat-percent-extra").innerHTML = "It seems like your AI company decided having extra clean energy was too expensive, so they built the data center somewhere without those regulations! Maybe there's a way to encourage them to implement them?"
        }
    } else {
        renewable = percent_renewable
        fossil_fuels = 100 - renewable
    }
    document.getElementById("stat-percent-fossil-fuels").innerHTML = fossil_fuels
    document.getElementById("stat-percent-clean-energy").innerHTML = renewable

    //if fossil fuels is 55, then emissions is 0.055 + 0.01
    let emissions_per_prompt = (fossil_fuels / 1000) + 0.01
    let emissions_day_grams = emissions_per_prompt * active_users * 2.5
    let emissions_day_tons = Math.round(emissions_day_grams / 1000000)
    let emissions_year = emissions_day_tons * 365

    document.getElementById("stat-emissions-day").innerHTML = emissions_day_tons
    document.getElementById("stat-emissions-annual").innerHTML = emissions_year
    
}

window.onload = main;