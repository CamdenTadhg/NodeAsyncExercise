url = 'https://deckofcardsapi.com/api/deck/new/draw/'
async function drawCard(){
    card = await axios.get(url);
    console.log(card);
}