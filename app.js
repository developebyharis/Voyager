

function app() {
    return `<div class="container">
        <h1>Dictionary App</h1>
        <input type="text" id="word-input" placeholder="Enter a word">
        <button id="search-button">Search</button>
        <div id="result">
            <h2 id="word"></h2>
            <p id="definition" ></p>
        </div>
    </div>`
}
document.body.innerHTML = app();






document.getElementById('search-button').addEventListener('click', function () {
    let word = document.getElementById('word-input').value;
    if (word) {
        fetchDefinition(word);
    } else {
        alert('Please enter a word');
    }
});

async function fetchDefinition(word) {
    const url = `https://api.api-ninjas.com/v1/dictionary?word=${word}`;
    const apiKey = process.env.API_KEY;


    const options = {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        const data = await response.json();
        if (!data || data.definition === undefined) {
            throw new Error('No definitions found');
        }
        let definition = data.definition;
        document.getElementById('word').innerText = word ;
        if(definition) {
            document.getElementById('definition').innerText = definition;
        document.getElementById('definition').style = ' border-left: 5px solid #007BFF; padding: 5px;'

        } else {
            document.getElementById('word').innerText = 'Not found';
            document.getElementById('definition').innerText = '';
        }
        
    } catch (error) {
        console.error('Error fetching the definition:', error);
        document.getElementById('word').innerText = '';
        document.getElementById('definition').innerText = 'Word not found';
    }
}
