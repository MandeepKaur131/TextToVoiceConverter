const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");

convertBtn.addEventListener('click', function () {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value;
    const error = document.querySelector('.error-para');

    if (!speechSynth.speaking && !enteredText.trim().length) {
        error.textContent = `Nothing to Convert! \n        Enter text in the text area.`
    }
    
    if (!speechSynth.speaking && enteredText.trim().length) {
        error.textContent = "";
        const newUtter = new SpeechSynthesisUtterance(enteredText);
        speechSynth.speak(newUtter);
        convertBtn.textContent = "Sound is Playing..."
    }
    
    setTimeout(() => {
        convertBtn.textContent = "Play Converted Sound"
    }, 5000);
});

// Feedback form logic
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var feedback = document.getElementById('feedbackText').value.trim();
        var msg = document.getElementById('feedbackMsg');
        if (!feedback) {
            msg.textContent = 'Please enter your feedback.';
            return;
        }
        msg.textContent = 'Sending...';
        fetch('https://formspree.io/f/xjkwnpvw', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: feedback,
                _subject: 'Feedback from Text-to-Speech App'
            })
        })
        .then(function(response) {
            if (response.ok) {
                msg.textContent = 'Thank you for your feedback!';
                document.getElementById('feedbackText').value = '';
            } else {
                msg.textContent = 'There was a problem sending your feedback.';
            }
            setTimeout(function(){ msg.textContent = ''; }, 4000);
        })
        .catch(function() {
            msg.textContent = 'There was a problem sending your feedback.';
            setTimeout(function(){ msg.textContent = ''; }, 4000);
        });
    });
}