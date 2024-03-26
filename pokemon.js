BASE_URL = 'https://pokeapi.co/api/v2/';
Pokemon = [];

async function getAllPokemon(){
    response = await axios.get(`${BASE_URL}pokemon/?limit=1302`);
    Pokemon = response.data.results;
    console.log(Pokemon);
}

async function threeRandomPokemon(){
    response = await axios.get(`${BASE_URL}pokemon/?limit=1302`);
    Pokemon = response.data.results;
    console.log(Pokemon);
    randomPokemonArray = [];
    for (let i = 1; i < 4; i++){
        randomIndex = Math.floor(Math.random() * 1302);
        response = await axios.get(Pokemon[randomIndex].url);
        randomPokemonArray.push(response.data);
    }
    randomPokemonArray.forEach(element => {
        console.log(element);
    });
}

async function threeRandomPokemonDescriptions(){
    let threeRandomResults = [];
    response = await axios.get(`${BASE_URL}pokemon/?limit=1302`);
    Pokemon = response.data.results;
    randomPokemonArray = [];
    for (let i = 1; i < 4; i++){
        randomIndex = Math.floor(Math.random() * 1302);
        response = await axios.get(Pokemon[randomIndex].url);
        randomPokemonArray.push(response.data);
    }
    for (let i = 0; i < 3; i++){
        console.log(randomPokemonArray[i]);
        response = await axios.get(randomPokemonArray[i].species.url);
        console.log(response);
        let desc = response.data.flavor_text_entries.find(({language}) => language.name === 'en');
        threeRandomResults.push({name: randomPokemonArray[i].name, desc: desc.flavor_text});
    }
    threeRandomResults.forEach(element => {
        console.log(`${element.name}: ${element.desc}`);
    })
}

$pokemonButton = $('#get-pokemon');
$pokemonDiv = $('#pokemon-div')

$pokemonButton.on('click', async function(){
    $pokemonDiv.empty();
    let threeRandomResults = [];
    response = await axios.get(`${BASE_URL}pokemon/?limit=1302`);
    Pokemon = response.data.results;
    randomPokemonArray = [];
    for (let i = 1; i < 4; i++){
        randomIndex = Math.floor(Math.random() * 1302);
        response = await axios.get(Pokemon[randomIndex].url);
        randomPokemonArray.push(response.data);
    }
    for (let i = 0; i < 3; i++){
        console.log(randomPokemonArray[i]);
        response = await axios.get(randomPokemonArray[i].species.url);
        console.log(response);
        let desc = response.data.flavor_text_entries.find(({language}) => language.name === 'en');
        threeRandomResults.push({name: randomPokemonArray[i].name, img: randomPokemonArray[i].sprites.front_default, desc: desc.flavor_text});
    }
    threeRandomResults.forEach(element => {
        $pokemonCard = createPokemonCard(element);
        $pokemonDiv.append($pokemonCard);
    })
})

function createPokemonCard(element){
    console.log('create pokemon card')
    $name = $(`<div>${element['name']}</div>`);
    $image = $(`<div><img src=${element['img']}></div>`);
    $desc = $(`<div>${element['desc']}</div>`);
    $div = $('<div class="pokemon-card"></div>');
    $div.append($name);
    $div.append($image);
    $div.append($desc);
    console.log($div);
    return $div;
}