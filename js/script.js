// Preloader

window.addEventListener("load", function () {
    document.querySelector(".preloader").classList.add("opacity-0");

    setTimeout(function () {
        document.querySelector(".preloader").style.display = "none";
    }, 1000)
})

//Portfolio Item filter

const filterContainer = document.querySelector(".portfolio-filter"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    totalPortfolioItem = portfolioItems.length;

for (i = 0; i < totalFilterBtn; i++) {
    filterBtns[i].addEventListener("click", function () {
        filterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");
        for (let k = 0; k < totalPortfolioItem; k++) {
            if (filterValue === portfolioItems[k].getAttribute("data-category")) {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            } else {
                portfolioItems[k].classList.add("hide");
                portfolioItems[k].classList.remove("show");
            }
            if (filterValue === "all") {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
        }
    })
};


//Portfolio Ligtbox

const lightbox = document.querySelector(".lightbox"),
    lightboxImg = lightbox.querySelector(".lightbox-img"),
    lightboxClose = lightbox.querySelector(".lightbox-close"),
    lightboxText = lightbox.querySelector(".lightbox-text"),
    lightboxCounter = lightbox.querySelector(".lightbox-counter");
let itemIndex = 0;
for (let i = 0; i < totalPortfolioItem; i++) {
    portfolioItems[i].addEventListener("click", function () {
        itemIndex = i;

        toggleLightbox();
        changeItem();
    })
}

function nextItem() {
    if (itemIndex === totalPortfolioItem - 1) {
        itemIndex = 0;
    } else {
        itemIndex++;
    }
    changeItem();
}

function prevItem() {
    if (itemIndex === 0) {
        itemIndex = totalPortfolioItem - 1;
    } else {
        itemIndex--;
    }
    changeItem();
}

function toggleLightbox() {
    lightbox.classList.toggle("open");
}

function changeItem() {
    imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
    lightboxImg.src = imgSrc;
    lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
    lightboxCounter.innerHTML = (itemIndex + 1) + " of " + totalPortfolioItem;
}


// Close Lightbox

lightbox.addEventListener("click", (event) => {
    if (event.target === lightboxClose || event.target === lightbox) {
        toggleLightbox();
    }
})


// Aside Navigation Bar

const nav = document.querySelector(".nav");
const navList = nav.querySelectorAll("li");
const totalNavList = navList.length;
const allSection = document.querySelectorAll(".section");
const totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        // remove back section class
        removeBackSectionClass();

        for (let k = 0; k < totalNavList; k++) {
            if (navList[k].querySelector("a").classList.contains("active")) {
                //add back section class
                addBackSectionClass(k);
            }
            navList[k].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");

        showSection(this);

        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    })
}

// Remove Back Section Class Function

function removeBackSectionClass() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function addBackSectionClass(num) {
    allSection[num].classList.add("back-section");
}



// Showing different Section
function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

// Update Nav when pressing Hire me button

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

// Hire Me Button

document.querySelector(".hire-me").addEventListener("click", function () {
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSectionClass();
    addBackSectionClass(sectionIndex);
})

// Aside Toggle
const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");


navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}