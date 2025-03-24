document.addEventListener("DOMContentLoaded", () => {
            const researchContainer = document.querySelector(".research-container");
            const cards = document.querySelectorAll(".card");
            let currentIndex = 0;
            let isScrolling = false;

            window.addEventListener("wheel", (event) => {
                if (isScrolling) return; // Prevents spam scrolling

                isScrolling = true;
                setTimeout(() => {
                    isScrolling = false;
                }, 800); // Delay to prevent fast scrolling

                if (event.deltaY > 0) {
                    // Scroll Down (Next Slide)
                    currentIndex = Math.min(currentIndex + 1, cards.length - 1);
                } else {
                    // Scroll Up (Previous Slide)
                    currentIndex = Math.max(currentIndex - 1, 0);
                }

                // Apply transform to move the cards horizontally
                researchContainer.style.transform = `translateY(-${currentIndex * 100}vw)`;
            });
        });