import "swiper/css"
import "../../styles/reset.scss"
import './../../styles/styles.scss'
import "./../../styles/mixins.scss"

import Swiper from "swiper";
import {Navigation} from "swiper/modules";
import {languages} from "./languages";

Swiper.use([Navigation])

const checkboxes = {
    requirements: ["minimum", "recommended"],
    versions: ["standard", "limited"]
}

let isPlay = false
const classes = {
    active: "active",
    opened: 'opened',
    hidden: "hidden",
};

const values = [
    {
        price: 19.99,
        title: "Standard edition"
    },
    {
        price: 18.99,
        title: "Standard edition"
    },
    {
        price: 29.99,
        title: "Deluxe edition"
    },
]
const checkBox = document.querySelectorAll(".checkbox")
const menuLink = document.querySelectorAll(".menu-link")
const header = document.querySelector(".header")
const menuButton = document.querySelector('.header-menu__button');
const video = document.getElementById('video')
const videoButton = document.querySelectorAll(".video-btn")
const faqItem = document.querySelectorAll(".faq-item")
const sections = document.querySelectorAll(".section")
const language = document.querySelectorAll(".language")
const buyButtons = document.querySelectorAll(".buy-button");
const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const modalTitle = document.querySelector(".modal-title")
const modalPrice = document.querySelector(".modal-total__price")
const modalClose = document.querySelector(".modal-close")

const toggleMenu = () => header.classList.toggle(classes.opened)
const scrollToSection = (e) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute("href")
    if (!href && !href.startsWith("#")) return;
    //alert(href)
    const section = href.slice(1)
    const top = document.getElementById(section).offsetTop || 0;
    window.scrollTo({top, behavior: "smooth"})
    //alert(section)
}
const formatValue = item => item < 10 ? `0${Math.floor(item)}` : Math.floor(item)
const getTimerValues = (diff) => {
    return {
        seconds: (diff / 1000) % 60,
        minutes: (diff / (1000 * 60)) % 60,
        hours: (diff / (1000 * 60 * 60)) % 24,
        days: (diff / (1000 * 60 * 60 * 24)),
    }
}
const setTimerValues = (values) => {
    Object.entries(values).forEach(([key, value]) => {
        //console.log(key, value)
        const timerValue = document.getElementById(key);
        timerValue.innerText = formatValue(value);
    })
}
const startTimer = date => {

    const id = setInterval(() => {
        const diff = new Date(date).getTime() - new Date().getTime()

        if (diff < 0) {
            clearInterval(id)
            return
        }
        const values = getTimerValues(diff)
        setTimerValues(getTimerValues(diff))
    }, 1000)
}

startTimer("2024-05-15")

const handleVideo = ({target}) => {
    const info = target.parentElement;

    isPlay = !isPlay;
    info.classList.toggle(classes.hidden, isPlay)
    target.innerText = isPlay ? "Pause" : "Play"
    isPlay ? video.play() : video.pause()
}
const handleCheckBox = ({currentTarget: {checked, name}}) => {
    const {active} = classes;
    const value = checkboxes[name][Number(checked)]
    const list = document.getElementById(value)
    const tabs = document.querySelectorAll(`[data-${name}]`)
    const siblings = list.parentElement.children;
    // console.log(value, "value")
    // console.log(list, "list")
    // console.log(tabs, "tabs")
    // console.log(value, "value")
    // console.log(siblings, "siblings")
    for (const item of siblings) item.classList.remove(active)
    for (const tab of tabs) {
        tab.classList.remove(active)
        tab.dataset[name] === value && tab.classList.add(active)
    }

    list.classList.add(active);
}
const handleFaqItem = ({currentTarget: target}) => {
    target.classList.toggle(classes.opened);
    const isOpened = target.classList.contains(classes.opened);
    const height = target.querySelector("p").clientHeight
    const content = target.querySelector(".faq-item__content")

    content.style.height = `${isOpened ? height : 0}px`
}
const initSlider = () => {
    new Swiper(".swiper", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        initialSlide: 2,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    })
}
const handleScroll = () => {
    const {scrollY, innerHeight} = window
    //console.log(scrollY, innerHeight)
    sections.forEach(section => {
        //console.log(section);
        if (scrollY > section.offsetTop - innerHeight / 1.5) {
            section.classList.remove(classes.hidden)
        }
    })
}
const setTexts = () => {
    const lang = localStorage.getItem("lang") || "en";
    const content = languages[lang]
    Object.entries(content).forEach(([key, value]) => {
        const items = document.querySelectorAll(`[data-text="${key}"]`)
        items.forEach(item => item.innerText = value)
    })
}
const toggleLanguage = ({target}) => {
    const {lang} = target.dataset;
    if (!lang) return;
    localStorage.setItem("lang", lang);
    setTexts()
}
const handleBuyButton = ({currentTarget: target}) => {
    const { value } = target.dataset;
    console.log(buyButtons)
    console.log(target)
    console.log(target.parentElement)
    //if(!value ) return;

    //const { price, title } = values[value];

    // modalTitle.innerText = title
    // modalPrice.innerHTML = price;
    modal.classList.add(classes.opened)
    overlay.classList.add(classes.opened)

}

const closeModal = () => {
    modal.classList.remove(classes.opened)
    overlay.classList.remove(classes.opened)
}
initSlider();
setTexts()
menuButton.addEventListener("click", toggleMenu)
videoButton.forEach(btn => btn.addEventListener("click", handleVideo))
menuLink.forEach(item => item.addEventListener("click", scrollToSection))
checkBox.forEach(box => box.addEventListener("click", handleCheckBox))
faqItem.forEach(item => item.addEventListener("click", handleFaqItem))
window.addEventListener("scroll", handleScroll)
language.forEach((lang) => lang.addEventListener("click", toggleLanguage))
buyButtons.forEach((btn) => btn.addEventListener("click", handleBuyButton))
modalClose.addEventListener("click", closeModal)
