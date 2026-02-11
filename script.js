// EmailJS Configuration
// Inicializar EmailJS con tu Public Key
// Reemplaza 'TU_PUBLIC_KEY' con tu clave pública de EmailJS
emailjs.init("XJgmMEusQQIRjmY-y");

// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const mealOptions = document.getElementById("meal-options");
const breakfastBtn = document.getElementById("breakfast-btn");
const dinnerBtn = document.getElementById("dinner-btn");
const finalText = document.getElementById("final-text");
const mealInfo = document.getElementById("meal-info");

// Click Envelope

envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
  }, 50);
});

// Logic to move the NO btn

function moveNoButton() {
  const buttonRect = noBtn.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Distancia máxima ajustada según el tamaño de pantalla
  const maxDistance = Math.min(150, windowWidth * 0.3);
  const minDistance = Math.min(100, windowWidth * 0.2);

  let moveX, moveY, newX, newY;
  let attempts = 0;
  const maxAttempts = 10;

  do {
    const distance = Math.random() * (maxDistance - minDistance) + minDistance;
    const angle = Math.random() * Math.PI * 2;

    moveX = Math.cos(angle) * distance;
    moveY = Math.sin(angle) * distance;

    newX = buttonRect.left + buttonRect.width / 2 + moveX;
    newY = buttonRect.top + buttonRect.height / 2 + moveY;

    attempts++;
  } while (
    (newX < buttonRect.width / 2 + 20 ||
      newX > windowWidth - buttonRect.width / 2 - 20 ||
      newY < buttonRect.height / 2 + 20 ||
      newY > windowHeight - buttonRect.height / 2 - 20) &&
    attempts < maxAttempts
  );

  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
  title.textContent = "¡Genial! 🎉";

  catImg.src = "cat_dance.gif";

  buttons.style.display = "none";
  mealOptions.style.display = "block";
});

// Breakfast option clicked
breakfastBtn.addEventListener("click", () => {
  sendEmail("Desayunar", "Desayuno en Época 27 Desayuno & Brunch a las 9:30 am.");
  showFinalMessage("Desayuno en Época 27 Desayuno & Brunch a las 9:30 am.");
});

// Dinner option clicked
dinnerBtn.addEventListener("click", () => {
  sendEmail("Cenar", "Cena en Restaurante Panorama Rooftop a las 7:30 pm.");
  showFinalMessage("Cena en Restaurante Panorama Rooftop a las 7:30 pm.");
});

// Function to send email
function sendEmail(choice, details) {
  // Parámetros del email
  const templateParams = {
    choice: choice,
    details: details,
    date: new Date().toLocaleString("es-ES"),
  };

  console.log("Intentando enviar email con parámetros:", templateParams);

  // Enviar email usando EmailJS
  emailjs.send("service_ljh3ccl", "template_ldbm5gs", templateParams).then(
    function (response) {
      console.log(
        "✅ Email enviado exitosamente!",
        response.status,
        response.text,
      );
    },
    function (error) {
      console.error("❌ Error al enviar email:", error);
      alert(
        "Hubo un problema al enviar la notificación. Revisa la consola (F12) para más detalles.",
      );
    },
  );
}

// Function to show final message
function showFinalMessage(message) {
  title.textContent = "¡Entonces... DIJISTE QUE SÍ!";

  document.querySelector(".letter-window").classList.add("final");

  mealOptions.style.display = "none";
  mealInfo.textContent = message;
  finalText.style.display = "block";
}
