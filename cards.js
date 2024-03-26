url = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1'
async function drawCard(){
    const card = await axios.get(url);
    console.log(card);
    console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
}

drawCard();

async function draw2Cards() {
    const card = await axios.get(url);
    const card2 = await axios.get(`http://deckofcardsapi.com/api/deck/${card.data.deck_id}/draw/?count=1`);
    console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit} and ${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`)
}

draw2Cards();

let $drawButton = $('#draw-card-btn');
let $cardDiv = $('#card-div');
let deck
let zindex = 0;

$(document).ready(async function(){
    deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    $drawButton.show();
})

$drawButton.on('click', async function(){
    let card = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`)
    let angle = Math.floor(Math.random() * 90 - 45);
    if (card.data.remaining === 0){
        $drawButton.hide();
    }
    let $img = $(`<img src=${card.data.cards[0].image} class="card-image" style='transform:rotate(${angle}deg); z-index: ${zindex}'>`);
    $cardDiv.append($img);
})




//on click of the button, place a card (with an angle)
//when the last card is drawn, make the button disappear
