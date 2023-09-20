
const searchInput = document.querySelector('.block.serach_block');
const searchIcon = document.querySelector('.icon_search');
let isSearchVisible = false;

searchIcon.addEventListener('click', function () {
    isSearchVisible = !isSearchVisible;
    searchInput.style.display = isSearchVisible ? 'block' : 'none';

});
const fixedElement = document.querySelector('.mainMenu');
let heightHeader = document.querySelector(".header").getBoundingClientRect();
function handleScroll() {
    const scrollY = window.scrollY;
    const elementRect = fixedElement.getBoundingClientRect();
    
    if (scrollY >= (heightHeader.bottom - 30) && !fixedElement.classList.contains('fixed')) {
        fixedElement.classList.add('fixed');
    }
    else if (scrollY <= (heightHeader.bottom - 30) && fixedElement.classList.contains('fixed')) {
        fixedElement.classList.remove('fixed');
    }
}

window.addEventListener('scroll', handleScroll);