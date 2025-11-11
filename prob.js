$(document).ready(function() {

  //THEME MANAGER
  const ThemeManager = {
    btn: $('#themeBtn'),
    html: $('html'),

    toggle() {
      const isDark = this.html.attr("data-theme") === "dark";
      if (isDark) {
        this.html.removeAttr("data-theme");
        localStorage.setItem("theme", "light");
        $('#themeIcon').text('🌞');
        $('#themeLabel').text('Light');
      } else {
        this.html.attr("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        $('#themeIcon').text('🌙');
        $('#themeLabel').text('Dark');
      }
    },

    init() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        this.html.attr("data-theme", "dark");
        $('#themeIcon').text('🌙');
        $('#themeLabel').text('Dark');
      } else {
        this.html.removeAttr("data-theme");
        $('#themeIcon').text('🌞');
        $('#themeLabel').text('Light');
      }
      this.btn.on("click", this.toggle.bind(this));
    }
  };

  ThemeManager.init();

  //MODAL WINDOW
  $("#signIn").on("click", function() {
    $("#signInForm").addClass("show");
  });

  $("#closeForm").on("click", function() {
    $("#signInForm").removeClass("show");
  });

  //FORM VALIDATION
  $("#loginForm").on("submit", function(e) {
    e.preventDefault();

    const userName = $("#nameUser").val().trim();
    const userEmail = $("#emailUser").val().trim();
    const userPass = $("#passUser").val().trim();
    const userPassConf = $("#passUserConf").val().trim();

    let messages = [];

    if (userName === "") messages.push("Enter name!");
    if (userEmail === "") messages.push("Enter email!");
    if (userPass === "") messages.push("Enter password!");
    if (userPass.length < 4 && userPass !== "") messages.push("Password too short!");
    if (userPass !== userPassConf) messages.push("Passwords do not match!");

    if (messages.length > 0) {
      $("#result").html(messages.join("<br>"));
    } else {
      $("#result").html("Well done!").css("color", "green");
      localStorage.setItem("userName", userName);
      
      setTimeout(() => {
        $("#signInForm").removeClass("show");
        $("#footerText").text(`The work was done by ${userName}, Dulat and Erasyl.`);
        this.reset();
      }, 1000);
    }
  });

  // Load saved username
  const savedUser = localStorage.getItem("userName");
  if (savedUser) {
    $("#footerText").text(`The work was done by ${savedUser}, Dulat and Erasyl.`);
  }

  //ACCORDION
$(".accordion-header").on("click", function() {
  const content = $(this).next(".accordion-content");
  $(".accordion-content").not(content).slideUp(300);
  content.slideToggle(300);
});


  //DATE AND TIME
  function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    $("#dateTimeDisplay").text(`Today: ${formattedDate}, Time: ${formattedTime}`);
    $("#currentDate").text(formattedDate);
    $("#currentTime").text(formattedTime);
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);

  $("#btndateCur").on("click", function() {
    const now = new Date();
    $("#datecur").text(`Today: ${now.toLocaleDateString()}, Time: ${now.toLocaleTimeString()}`);
  });

  //RATING STARS
  $(".star").on("click", function() {
    const index = $(this).index();
    $(".star").removeClass("selected");
    $(".star").slice(0, index + 1).addClass("selected");
    $("#rating-message").text(`Your rate: ${index + 1}`);
  });

  //READ MORE TOGGLE
  $(".readMore").on("click", function() {
    const year = $(this).prev(".years");
    year.slideToggle(400);
    
    if ($(this).text() === "Read More") {
      $(this).text("Hide");
    } else {
      $(this).text("Read More");
    }
  });

  //COLOR CHANGE BUTTONS
  $("#redBtn").on("click", () => $("body").css("background-color", "red"));
  $("#blueBtn").on("click", () => $("body").css("background-color", "blue"));
  $("#greenBtn").on("click", () => $("body").css("background-color", "green"));
  $("#resetBtn").on("click", () => $("body").css("background-color", ""));

  //FADE IN ANIMATION
  $(".block").hide().fadeIn(1000);
  $(".card").hide().fadeIn(1500);

});





//SIGN IN MODAL (vanilla JS)
const openPopup = document.getElementById("signIn");
const closePopup = document.getElementById("closeForm");
const signInForm = document.getElementById("signInForm"); 

if (openPopup && signInForm && closePopup) {
  openPopup.addEventListener("click", () => {
    signInForm.style.display = "flex";
    signInForm.classList.add("show");
  });

  closePopup.addEventListener("click", () => {
    signInForm.style.display = "none";
    signInForm.classList.remove("show");
  });
}

//LOGIN FORM (vanilla JS)
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userName = document.getElementById("nameUser").value.trim();
    const userPass = document.getElementById("passUser").value.trim();
    const userPassConf = document.getElementById("passUserConf").value.trim();
    const userEmail = document.getElementById("emailUser").value.trim();

    let mass = "";

    switch (true) {
        case userName === "":
            mass += "Enter name!<br>";
            break;
        case userEmail === "":
            mass += "Enter email!<br>";
            break;
        case userPass === "":
            mass += "Enter password!<br>";
            break;
        case userPass.length < 4 && userPass !== "":
            mass += "Long password!<br>";
            break;
        case userPass !== userPassConf:
            mass += "Passwords do not match!<br>";
            break;
    }

    document.getElementById("result").innerHTML = mass || "Well done!";
    if (mass === "") { 
      localStorage.setItem("textToFooter", `${userName}`);
      location.reload();
    }
  })
}

//LOAD USERNAME (vanilla JS)
window.addEventListener("load", () => {
  const textResult = localStorage.getItem("textToFooter");
  const footerText = document.getElementById("footerText");
  if (textResult && footerText) {
    footerText.textContent = `${textResult}`;
  }
})

//COLOR PICKER (vanilla JS)
const first = document.getElementById("firstS");
const second = document.getElementById("secondS"); 
const third = document.getElementById("thirdS");  
const btn1 = document.getElementById("forColorC");
const btnToCl = document.getElementById("forColorR");

if (first && second && third && btn1 && btnToCl) {
  btn1.addEventListener("click", () => {
    const r = first.value;
    const g = second.value;
    const b = third.value;

    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      document.body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
    }
  });

  btnToCl.addEventListener("click", () => {
    document.body.style.backgroundColor = "white";
  })
}

//DATE TIME DISPLAY (vanilla JS)
const dateTimeDisplay = document.getElementById("dateTimeDisplay");

if (dateTimeDisplay) {
  function updateDateTime() {
    const now = new Date();
    const nowDate = now.toLocaleDateString();
    const nowTime = now.toLocaleTimeString();
    dateTimeDisplay.textContent = `To day ${nowDate}, Time ${nowTime}`;
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

//DATE BUTTON (vanilla JS)
const btnOfCurr = document.getElementById("btndateCur");

function dateTim() {
  const now = new Date();
  const nowDate = now.toLocaleDateString();
  const nowTime = now.toLocaleTimeString();
  return `To day ${nowDate}, Time ${nowTime}`;
}

if (btnOfCurr) {
  btnOfCurr.addEventListener("click", () => {
    let timeNeed = dateTim();
    const datecur = document.getElementById("datecur");
    if (datecur) {
      datecur.textContent = timeNeed;
    }
  })
}

//THEME MANAGER (vanilla JS для prob2.html)
const ThemeManagerVanilla = {
    btn: document.getElementById('themeBtn'),
    html: document.documentElement,

    toggle() {
        const isDark = this.html.getAttribute("data-theme") === "dark";
        if (isDark) {
          this.html.removeAttribute("data-theme");
          localStorage.setItem("theme", "light");
          const icon = document.getElementById('themeIcon');
          const label = document.getElementById('themeLabel');
          if (icon) icon.textContent = '🌞';
          if (label) label.textContent = 'Light';
          if (this.btn) this.btn.setAttribute('aria-pressed', 'false');
        } else {
          this.html.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
          const icon = document.getElementById('themeIcon');
          const label = document.getElementById('themeLabel');
          if (icon) icon.textContent = '🌙';
          if (label) label.textContent = 'Dark';
          if (this.btn) this.btn.setAttribute('aria-pressed', 'true');
        }
    },

    init() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
          this.html.setAttribute("data-theme", "dark");
          const icon = document.getElementById('themeIcon');
          const label = document.getElementById('themeLabel');
          if (icon) icon.textContent = '🌙';
          if (label) label.textContent = 'Dark';
          if (this.btn) this.btn.setAttribute('aria-pressed', 'true');
        } else {
          this.html.removeAttribute("data-theme");
          const icon = document.getElementById('themeIcon');
          const label = document.getElementById('themeLabel');
          if (icon) icon.textContent = '🌞';
          if (label) label.textContent = 'Light';
          if (this.btn) this.btn.setAttribute('aria-pressed', 'false');
        }
        if (this.btn) this.btn.addEventListener("click", this.toggle.bind(this));
    }
};

if (document.getElementById('themeBtn') && !window.jQuery) {
  ThemeManagerVanilla.init();
}

//READ MORE BUTTONS (vanilla JS)
const years = document.querySelectorAll(".years");
const btnMore = document.querySelectorAll(".readMore");

if (years && btnMore) {
  btnMore.forEach((btnRead, index) => {
    btnRead.addEventListener("click", () => {
      const year = years[index];
      if (year.classList.contains("years")) {
        year.classList.remove("years");
        btnRead.textContent = "Hide"; 
      } else {
        year.classList.add("years"); 
        btnRead.textContent = "Read More";
      }
    });
  });
}

//RATING STARS (vanilla JS)
const stars = document.querySelectorAll(".star");
const rating = document.getElementById("rating-message");

if (stars && rating && stars.length > 0) {
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      stars.forEach(s => s.classList.remove("selected"));

      for (let i = 0; i <= index; i++) {
        stars[i].classList.add("selected");
      }

      rating.textContent = `Your results: ${index + 1}`;
    });
  });
}

//MENU KEYBOARD NAVIGATION (vanilla JS)
const menuItems = document.querySelectorAll('#menu li');
let currentIndex = 0;

if (menuItems.length > 0) {
  function updateFocus(index) {
      menuItems.forEach((item, i) => {
          item.tabIndex = (i === index) ? 0 : -1;
          if (i === index) {
              item.focus();
          }
      });
  }

  function handleKeyDown(event) {
      if (event.key === 'ArrowDown') {
          currentIndex = (currentIndex + 1) % menuItems.length;
          updateFocus(currentIndex);
          event.preventDefault(); 
      } else if (event.key === 'ArrowUp') {
          currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
          updateFocus(currentIndex);
          event.preventDefault();
      }
  }

  document.addEventListener('keydown', handleKeyDown);
  updateFocus(currentIndex);
}









$(document).ready(function(){
    console.log("jQuery is ready!");
});


$(document).ready(function() {

  $("#search").on("keyup", function() {
    let value = $(this).val().toLowerCase();

    $("#itemList li").each(function() {
      let text = $(this).text().toLowerCase();

      if(text.indexOf(value) > -1 && value !== "") {
        $(this).fadeIn(500);  
      } else {
        $(this).fadeOut(500); 
      }
    });
    if(value === "") {
      $("#itemList li").fadeOut(500);
    }
  });
});


$(document).ready(function() {

  let items = [];
  $("#itemList li").each(function() {
    items.push($(this).text());
  });

  $("#search").on("keyup", function() {
    let input = $(this).val().toLowerCase();

    $("#suggestions").empty();

    if(input === "") return;

    let matches = items.filter(item => item.toLowerCase().includes(input));

    matches.forEach(item => {
      $("#suggestions").append(`<div class="suggestion">${item}</div>`);
    });
  });

  $(document).on("click", ".suggestion", function() {
    $("#search").val($(this).text());
    $("#suggestions").empty(); 
  });

});



$(document).ready(function() {

  let $textElement = $(".content_Robert p");
    let originalText = $textElement.html();

    function showToast(message, duration = 3000) {
        let $toast = $('<div class="toast"></div>').text(message);
        $("#toastContainer").append($toast);

        setTimeout(function() {
            $toast.addClass("show");
        }, 100);

        setTimeout(function() {
            $toast.removeClass("show");
            setTimeout(function() {
                $toast.remove();
            }, 500);
        }, duration);
    }
    

  $("#searchBtn").on("click", function() {
    let value = $("#searchInput").val().trim();

    let textElement = $(".content_Paul p");

    if(value === "") {
      textElement.find("span.highlight").each(function() {
        $(this).replaceWith($(this).text());
      });
      return;
    }

    let escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let regex = new RegExp("(" + escapedValue + ")", "gi");

    textElement.contents().each(function() {
      if(this.nodeType === 3) { 
        let newHtml = $(this).text().replace(regex, '<span class="highlight">$1</span>');
        $(this).replaceWith(newHtml);
      }
    });

  });

});


$(document).ready(function() {
  $(window).on("scroll", function() {
    let scrollTop = $(window).scrollTop(); 
    let docHeight = $(document).height(); 
    let winHeight = $(window).height();

    let scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

    $("#progressBar").css("width", scrollPercent + "%");
  });
});


$(document).ready(function() {
  $(".count").each(function() {
    let $this = $(this);
    let target = parseInt($this.attr("data-target"));
    let current = 0;
    let increment = Math.ceil(target / 5000); 
    let interval = setInterval(function() {
      current += increment;
      if(current >= target) {
        current = target;
        clearInterval(interval);
      }
      $this.text(current.toLocaleString()); 
    }, 10); 
  });
});




$(document).ready(function() {

  function dateTim() {
    const now = new Date();
    const nowDate = now.toLocaleDateString();
    const nowTime = now.toLocaleTimeString();
    return `Today ${nowDate}, Time ${nowTime}`;
  }

  $("#btndateCur").on("click", function() {
    function showToast(message) {
      $("#toastContainer").stop(true, true).text(message).fadeIn(400);

      setTimeout(() => {
        $("#toastContainer").fadeOut(400);
      }, 3000);
    }
    let $btn = $(this);
    let $output = $("#datecur");

    $btn.prop("disabled", true).text("Loading...");

    setTimeout(function() {
      $output.text(dateTim());

      $btn.prop("disabled", false).text("Show Current Date & Time");
    }, 5000); 
    showToast("✅ Hello! This is a notification.");
  });

});



$(document).ready(function() {
      $("#copyBtn").on("click", function() {
        const textToCopy = $("#1967–1979:_Career_stardom").text();
        const $btn = $(this);

        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            $btn.text("Copied ✅");
            setTimeout(() => {
              $btn.text("Copy");
            }, 2000);
          })
          .catch(() => {
            $btn.text("Failed ❌");
            setTimeout(() => {
              $btn.text("Copy");
            }, 2000);
          });
      });
    });



$(document).ready(function() {
  function lazyLoad() {
    $(".imgPic").each(function() {
      const $img = $(this);
      if ($img.attr("src")) return; 

      const windowBottom = $(window).scrollTop() + $(window).height();
      const imgTop = $img.offset().top;

      if (imgTop < windowBottom + 100) { 
        $img.attr("src", $img.data("src"));
      }
    });
  }

  $(window).on("scroll", lazyLoad);

  lazyLoad();
});
