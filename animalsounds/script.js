// ---------- Animal Sound Data ----------
const sounds = [
    { animal: "cow", file: "assets/moo.mp3" },
    { animal: "dog", file: "assets/woof.mp3" },
    { animal: "cat", file: "assets/meow.mp3" },
    { animal: "horse", file: "assets/neigh.mp3" },
    { animal: "pig", file: "assets/oink.mp3" },
    { animal: "lion", file: "assets/roar.mp3" },
    { animal: "snake", file: "assets/hiss.mp3" },
    { animal: "tiger", file: "assets/growl.mp3" }
];

// ---------- Variables ----------
let currentSound = null;
let score = 0;

const logoScreen = document.getElementById("logoScreen");
const instructionScreen = document.getElementById("instructionScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");

const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const soundContainer = document.getElementById("soundContainer");

const scoreDisplay = document.getElementById("score");
const finalMarks = document.getElementById("finalMarks");

const message = document.getElementById("message");

const audioPlayer = document.getElementById("audioPlayer");

// -------------------- Splash Screen --------------------

window.onload = function () {

    setTimeout(function () {

        logoScreen.classList.add("hidden");
        instructionScreen.classList.remove("hidden");

    }, 5000);

};

// -------------------- Voice --------------------

function speak(text) {

    if ("speechSynthesis" in window) {

        let speech = new SpeechSynthesisUtterance(text);

        speech.rate = 0.9;

        speechSynthesis.speak(speech);

    }

}

speak("Welcome to Match the Animal Sounds Game");

// -------------------- Shuffle --------------------

function shuffle(array) {

    return array.sort(() => Math.random() - 0.5);

}

// -------------------- Build Sound Cards --------------------

function createSoundCards() {

    soundContainer.innerHTML = "";

    let shuffled = shuffle([...sounds]);

    shuffled.forEach((item, index) => {

        let card = document.createElement("div");

        card.className = "soundCard";

        card.innerHTML = "🔊 Sound " + (index + 1);

        card.onclick = function () {

            currentSound = item;

            audioPlayer.src = item.file;

            audioPlayer.play();

        };

        soundContainer.appendChild(card);

    });

}

// -------------------- Start Button --------------------

startBtn.onclick = function () {

    instructionScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    createSoundCards();

    speak("Click a sound and then click the matching animal.");

};

// -------------------- Animal Click --------------------

document.querySelectorAll(".animalCard").forEach(card => {

    card.addEventListener("click", function () {

        if (currentSound == null) {

            alert("Please click a sound first.");

            return;

        }

        if (card.dataset.animal == currentSound.animal) {

            score++;

            scoreDisplay.innerHTML = score;

            message.innerHTML = "⭐ Correct!";

            card.style.border = "5px solid green";

            card.style.pointerEvents = "none";

            currentSound = null;

            if (score == 8) {

                gameScreen.classList.add("hidden");

                endScreen.classList.remove("hidden");

                finalMarks.innerHTML = score + " / 8";

                speak("Congratulations! You matched all the animals.");

            }

        }

        else {

            message.innerHTML = "❌ Try Again";

            alert("Wrong! Try Again.");

            currentSound = null;

        }

    });

});

// -------------------- Play Again --------------------

playAgainBtn.onclick = function () {

    location.reload();

};
