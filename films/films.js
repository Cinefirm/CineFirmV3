// Select all cards
const cards = document.querySelectorAll('.flims_card');

function animateCards() {
    cards.forEach((card, index) => {
        gsap.fromTo(card, 
            { scale: 0.8, opacity: 0 },
            {
                scale: 1, 
                opacity: 1,
                duration: 0.5,
                delay: index * 0.3,
                yoyo: true,
                repeat: 0,
                ease: "power1.inOut"
            }
        );
    });
}

// Start the animation after the DOM is fully loaded
window.onload = () => {
  animateCards();
};