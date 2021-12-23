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
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
window.addEventListener("scroll", reveal);

let target = document.querySelector('footer');

var scrollToTopBtn = document.querySelector(".scrollUpBtn");
var rootElement = document.documentElement;


function callback(entries, observer) {
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

let observer = new IntersectionObserver(callback);

observer.observe(target);


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btns = document.querySelectorAll("#btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function(){
    modal.style.display = "block";
  });
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
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
  var x = document.getElementById("toast")
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}
