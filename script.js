let theme = localStorage.getItem('theme');

if (theme === null) {
    setTheme('light');
    
}else{
    setTheme(theme);
}

let themeDots = document.getElementsByClassName('theme-dot');

for (let i = 0; i < themeDots.length; i++) {
    themeDots[i].addEventListener('click', function(){
        let mode = this.dataset.mode;
        setTheme(mode);
    });
    
}

function setTheme(mode){
    if (mode === 'light') {
        document.getElementById('theme-style').href = 'default.css'
    }
    if (mode === 'blue') {
        document.getElementById('theme-style').href = 'blue.css'
    }
    if (mode === 'green') {
        document.getElementById('theme-style').href = 'green.css'
    }
    if (mode === 'purple') {
        document.getElementById('theme-style').href = 'purple.css'
    }

    localStorage.setItem('theme', mode);
}


function reveal() {
    const reveals = document.querySelectorAll(".reveal");
  
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
window.addEventListener("scroll", reveal);

let target = document.querySelector('footer');

const scrollToTopBtn = document.querySelector(".scrollUpBtn");
const rootElement = document.documentElement;


function showScrollUpBtn(entries, observer) {
    // The callback will return an array of entries, even if you are only observing a single item
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Show button
        scrollToTopBtn.classList.add('showScrollBtn');
      } else {
        // Hide button
        scrollToTopBtn.classList.remove('showScrollBtn');
      }
    });
  }

function scrollToTop() {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

scrollToTopBtn.addEventListener("click", scrollToTop);

const observer = new IntersectionObserver(showScrollUpBtn);

observer.observe(target);


// Get the modal
const modal = document.getElementById("myModal");

// Get the model-content divs
const modelContent = document.querySelectorAll('.modal-content')

// Get the button that opens the modal
const btns = document.querySelectorAll("#btn");

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName("close");


// When the user clicks on the button, open the modal and disable scroll of the page under overlay
const body = document.body;
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function(){
    modal.style.display = "block";
    modelContent[i].style.display = "flex";
    body.classList.toggle('noscroll');
  });
}

// When the user clicks on <span> (x), close the modal
for (const btn of closeBtn) {
  btn.onclick = function() {
    modal.style.display = "none";
    btn.parentElement.parentElement.style.display = "none";
    body.classList.remove('noscroll');
  }
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    body.classList.remove('noscroll')
    modal.children.forEach((child)=>{
      if (child.classList.contains('modal-content')) {
        child.style.display = "none"
      }
    })
  }
}

// listen to the form submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const serviceID = "service_5bstzba";
  const templateID = "contact_form";

  // send the email here
  emailjs.sendForm(serviceID, templateID, this).then(
    (response) => {
      resetFields();
      launch_toast();
    },
    (error) => {
      console.log("FAILED...", error);
      alert("FAILED...", error);
    }
  );
});


function resetFields(){
  document.getElementById('submit-btn').setAttribute('disabled', true);

  const fields = document.getElementsByClassName("input-field");
  for (let i = 0; i < fields.length; i++) {
    fields[i].value = "";
  }
}


function launch_toast() {
  const x = document.getElementById("toast")
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

// Get active anchor link in menu based on section in view

const sections = document.querySelectorAll('section');
let sectionsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    
    if (entry.isIntersecting) {
      document.querySelector(`[data-link="${entry.target.id}"]`).classList.add('current')
    }else{
      document.querySelector(`[data-link="${entry.target.id}"]`).classList.remove('current')

    }
  })
}, {threshold: .3});

sections.forEach(sec => 
  sectionsObserver.observe(sec))


const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.nav-item');

//set initial state of menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

for (const navItem of navItems) {
  navItem.addEventListener('click', ()=>{
    toggleMenu();
    
  })
}

function toggleMenu(){
    if(!showMenu){
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        body.classList.toggle('noscroll');

        navItems.forEach(item => item.classList.add('show'));

        showMenu = true;
    }else{
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        body.classList.toggle('noscroll');

        navItems.forEach(item => item.classList.remove('show'));

        showMenu = false;
    }
}

const navbarTarget = document.querySelector('.greeting-wrapper')
const navwrapper = document.querySelector('.nav-wrapper')

const navbarObserver = new IntersectionObserver((entries)=>{
  
  if (!entries[0].isIntersecting && !navwrapper.classList.contains('navbar')) {
    navwrapper.classList.replace('nav-wrapper','navbar')
  }else{
    // navwrapper.classList.remove('navbar')
    navwrapper.classList.replace('navbar', 'nav-wrapper')

  }

  // if (!entries[0].isIntersecting && !navwrapper.classList.contains('navbar')) {
  //   navwrapper.classList.add('navbar')
// }
  
  // navbarTarget.classList.toggle('navbar', entry.isIntersecting);
  // navbarTarget.classList.toggle('nav-wrapper', entry.isIntersecting);
}, {rootMargin: '0px 0px 100px 0px' ,threshold: .1})

navbarObserver.observe(navbarTarget)