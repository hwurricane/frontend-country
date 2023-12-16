const apiUrl = "https://3003-hwurricane-frontendcoun-1125jgeyo1n.ws-us107.gitpod.io"
const container = document.querySelector('[data-container=""]')
const input = document.querySelector('[data-input=""]')

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

function getAllCountries(countryName = '') {
    // função de callback
    return fetch(`${apiUrl}/getcountries?countryname=${countryName}`)
      .then(function (res) {
        return res.json()
      })
      .then(function (data) {
        return data
      })
  }
  
  const data = getAllCountries()
  
  function renderCountires(countriesPromise) {
    countriesPromise.then((countries) => {
      countries.forEach(function (country) {
        const div = document.createElement('div')
        div.innerHTML = getTemplate({
          countryName: country.name,
          capital: country.capital,
          img: country.flags.svg,
          population: country.population,
          region: country.region
        })
        container.appendChild(div)
      })
    })
  }
  
  const countriesPromise = getAllCountries()
  
  renderCountires(countriesPromise)

  input.addEventListener('change', (event) => {
    container.innerHTML = ``
    const countriesPromise = getAllCountries(event.target.value)
    renderCountires(countriesPromise)
  })