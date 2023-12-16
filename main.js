const apiUrl = "https://restcountries.com/v3.1"
const container = document.querySelector( '[data-container=""]' )
function getTemplate ( { countryName, img, population, region, capital } ) {
    return `
    <div class="country">
        <img
            src="${img}"
            alt="flag"
            class="country-img"
        />
        <div class="country-info">
            <p class="country-title">${countryName}</p>
            <p class="country-text">Popultion: <span>${population}</span></p>
            <p class="country-text">Região: <span>${region}</span></p>
            <p class="country-text">Capital: <span>${capital}</span></p>
        </div>
    </div>
    `
}


function getAllCountries () {
    // função de callback
    return fetch( `${apiUrl}/all` ).then( function ( res ) {
        return res.json()
    } ).then( function ( data ) {
        return data
    } )
}


function renderCountires () {

    getAllCountries().then( countries => {
        countries.forEach( function ( country ) {
            const div = document.createElement( 'div' )
            div.innerHTML = getTemplate( { countryName: country.name.common, capital: country.capital ? country.capital[0] : '-', img: country.flags.svg, population: country.population, region: country.region } )
            container.appendChild( div )
        } )
    } )
}

renderCountires()