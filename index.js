const client_id = 'JXhzdRLfmE3MUrP0FRuHZOMBlTAQ22JQPORtC_mFC5k'
const imagesContainer = document.querySelector('.gallery .container')
let countImages = 12
const searchInput = document.querySelector('#searchForm')
const clearButton = document.querySelector('.clear__btn')
const search = document.querySelector('.search__input')





//* Events
searchInput.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputValue = document.querySelector('.search__input').value
    if(!inputValue) return
    fetchImages(true, inputValue)
    
    
})

if(clearButton) {
    search.addEventListener('focus', () => {
        clearButton.style.display = 'block';
    });
    
    clearButton.addEventListener('mousedown', (event) => {
        event.preventDefault(); 
    });
    search.addEventListener('blur', () => {
        clearButton.style.display = 'none';
    });
    clearButton.addEventListener('click', () => {
        search.value = ''
        searchInput.value = ''
    })

}




const fetchImages = async (search, request) => {
    let url = `https://api.unsplash.com/photos/random?client_id=${client_id}&count=${countImages}`
    if(search && request) {
        url = `https://api.unsplash.com/search/photos?query=${request}&count=${countImages}&client_id=${client_id}`

    }

    try {
        const res = await fetch(url)
    
        if(!res.ok) {
            const errorText = await res.text()
            throw new Error(errorText)
        }

        let data = await res.json()

        const images = search ? data.results : data; 
        if(search) {
            imagesContainer.innerHTML = ''
        }
        if (Array.isArray(images)) {
            
            images.forEach(obj => {
                if (obj.urls) {
                    addToPageImage(obj.urls); 
                }
            });
        } else {
            throw new Error('API не вернуло массив изображений');
        }

    } catch (error) {
        console.error('Ошибка при получении изображений:', error.message);
    }


}

function addToPageImage(urls) {
    if(!urls) return
    const div = document.createElement('div')
    div.classList.add('crads__container')
    div.style.backgroundImage = `url('${urls.small || 'images/stock_background.avif'}')`
    imagesContainer.appendChild(div)
}

fetchImages()