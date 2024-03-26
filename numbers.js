$numbersDiv = $('.numbers-div');

async function getNumberTrivia() {
    let resp = await axios.get('http://numbersapi.com/48/trivia?json');
    console.log(resp.data);
}

getNumberTrivia();

async function getMultipleNumberTrivia() {
    let resp = await axios.get('http://numbersapi.com/1..5?json');
    for (let i = 1; i < 6; i++){
        $trivia = $(`<p>${resp.data[i]}</p>`)
        $numbersDiv.append($trivia)
    }
}

getMultipleNumberTrivia();

let url = 'http://numbersapi.com/48/trivia?json';
let fourNumberTrivia = [];
async function getMultipleTrivia(){
    for (let i = 1; i < 5; i++){
        fourNumberTrivia.push(await axios.get(url));
    }
    fourNumberTrivia.forEach((element) => {
        $trivia = $(`<p>${element.data.text}</p>`);
        $numbersDiv.append($trivia);
    })
}

getMultipleTrivia();