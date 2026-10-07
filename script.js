document.addEventListener("DOMContentLoaded", () => {
    // Scroll Reveal Animation via Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the CSS transition
                entry.target.classList.add('visible');
                // Optional: Stop observing once it has animated to save resources
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the 'fade-up' class
    const fadeElements = document.querySelectorAll('.fade-up');
    
    // Slight delay for the very first hero elements on load
    fadeElements.forEach((el, index) => {
        if(el.closest('.hero')) {
            setTimeout(() => {
                el.classList.add('visible');
            }, 100 * index); 
        } else {
            observer.observe(el);
        }
    });
    
    // Navbar visual change on scroll (optional enhancement)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.7)';
        }
    });
// Real Web3Forms AJAX Submission
    const form = document.getElementById('enrollForm');
    
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop standard HTML redirect
            
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            // Show loading state
            btn.innerHTML = "Sending...";
            btn.style.opacity = "0.7";
            btn.style.pointerEvents = "none"; // Prevent double clicks
            
            // Gather the data
            const formData = new FormData(form);
            
            // Send the data to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                
                if (response.status == 200) {
                    // Success! Show green confirmation
                    btn.innerHTML = "Request Sent!";
                    btn.style.backgroundColor = "#32d74b"; // Apple green
                    btn.style.opacity = "1";
                    form.reset(); // Clear the inputs
                } else {
                    // Something went wrong on Web3Forms side
                    console.log(response);
                    btn.innerHTML = "Error. Try Again.";
                    btn.style.backgroundColor = "#ff3b30"; // Apple red
                    btn.style.opacity = "1";
                }
            })
            .catch(error => {
                console.log(error);
                btn.innerHTML = "Network Error.";
                btn.style.backgroundColor = "#ff3b30";
                btn.style.opacity = "1";
            })
            .then(function() {
                // Reset button back to normal after 4 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = "";
                    btn.style.pointerEvents = "auto";
                }, 4000);
            });
        });
    }

    
});document.addEventListener("DOMContentLoaded", () => {
    
    // 1. High-Performance Scroll Reveal (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12 // Triggers when 12% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS animation
                entry.target.classList.add('visible');
                // Stop observing once animated to save CPU/Battery
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target all elements with the fade-up class
    const fadeElements = document.querySelectorAll('.fade-up');
    
    fadeElements.forEach((el, index) => {
        // For hero elements, animate immediately on load with slight stagger
        if(el.closest('.hero')) {
            setTimeout(() => {
                el.classList.add('visible');
            }, 150 * (index + 1)); 
        } else {
            // For elements further down, observe them
            observer.observe(el);
        }
    });

    // 2. Navbar Scroll Effect (Adds slight shadow/opacity on scroll)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true }); // passive: true improves scroll performance

    // 3. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    
// --- Dynamic SVG Avatar Rotation ---
    const avatars = document.querySelectorAll('.avatar-svg-img');
    
    // A pool of dynamic SVG avatar URLs using the DiceBear API
    // You can change the 'seed' names to generate completely different faces
    const avatarPool = [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=b6e3f4",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Riya&backgroundColor=c0aede",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Kabir&backgroundColor=d1d4f9",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Anya&backgroundColor=ffdfbf",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev&backgroundColor=ffd5dc",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha&backgroundColor=b6e3f4",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan&backgroundColor=c0aede",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Zara&backgroundColor=d1d4f9"
    ];

    if (avatars.length > 0) {
        setInterval(() => {
            // 1. Pick a random avatar slot on the screen (0, 1, or 2)
            const randomSlot = Math.floor(Math.random() * avatars.length);
            const imgElement = avatars[randomSlot];
            
            // 2. Get the URLs of the images currently being shown
            const currentSrcs = Array.from(avatars).map(img => img.src);
            
            // 3. Find a new SVG from the pool that isn't currently on screen
            const availableImages = avatarPool.filter(src => !currentSrcs.includes(src));
            const newImage = availableImages[Math.floor(Math.random() * availableImages.length)];
            
            // 4. Trigger the fade out animation
            imgElement.classList.add('fade-out');
            
            // 5. Wait for the CSS fade-out to finish, swap the SVG, and fade back in
            setTimeout(() => {
                imgElement.src = newImage;
                imgElement.classList.remove('fade-out');
            }, 400); // 400ms matches the CSS transition time
            
        }, 3000); // Rotates one avatar every 3 seconds
    }

    // --- Interactive Mentor Badges ---
    const mentorSection = document.getElementById('mentor');
    const badges = document.querySelectorAll('.tech-badge');

    if (mentorSection && badges.length > 0 && window.matchMedia("(min-width: 900px)").matches) {
        mentorSection.addEventListener('mousemove', (e) => {
            const rect = mentorSection.getBoundingClientRect();
            // Calculate mouse position relative to the center of the section
            const x = (e.clientX - rect.left - rect.width / 2) / 25;
            const y = (e.clientY - rect.top - rect.height / 2) / 25;

            // Move each badge slightly differently for a parallax feel
            badges[0].style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`;
            badges[1].style.transform = `translate(${x * -1}px, ${y * -1}px)`;
            badges[2].style.transform = `translate(${x * 1.2}px, ${y * 0.8}px)`;
        });

        mentorSection.addEventListener('mouseleave', () => {
            // Smoothly reset position when mouse leaves
            badges.forEach(badge => {
                badge.style.transform = `translate(0px, 0px)`;
                badge.style.transition = 'transform 0.5s ease-out';
            });
            
            setTimeout(() => {
                badges.forEach(badge => badge.style.transition = 'none');
            }, 500);
        });
    }


    // --- Interactive S-Curve Timeline ---
    const drawLine = document.getElementById('draw-line');
    const glowDot = document.getElementById('glow-dot');
    const coursesSection = document.getElementById('courses');

    if (drawLine && coursesSection && glowDot) {
        // Automatically calculate the exact length of the curved SVG line
        const pathLength = drawLine.getTotalLength();
        
        // Setup initial stroke properties to hide the line
        drawLine.style.strokeDasharray = pathLength;
        drawLine.style.strokeDashoffset = pathLength;

        window.addEventListener('scroll', () => {
            const rect = coursesSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Start drawing when the section enters the screen
            const scrollStart = windowHeight * 0.75; 
            
            // Calculate percentage scrolled (0 to 1)
            let percentage = (scrollStart - rect.top) / (rect.height - 200);
            
            // Clamp the value between 0 and 1
            if (percentage < 0) percentage = 0;
            if (percentage > 1) percentage = 1;

            // 1. Draw the line down
            drawLine.style.strokeDashoffset = pathLength - (pathLength * percentage);

            // 2. Move the glowing dot along the exact coordinates of the SVG path
            if (percentage > 0.02 && percentage < 0.98) {
                glowDot.style.opacity = '1';
                // Get the exact X/Y coordinate on the curve at the current percentage
                const point = drawLine.getPointAtLength(pathLength * percentage);
                
                // Position the dot (using percentages to match the viewBox 0-100 system)
                glowDot.style.left = `${point.x}%`;
                glowDot.style.top = `${point.y}%`;
            } else {
                glowDot.style.opacity = '0';
            }
            
        }, { passive: true }); // Ensure smooth scrolling
    }

    
});