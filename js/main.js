// Main JavaScript for BrandZen Website

document.addEventListener('DOMContentLoaded', function() {
    // Dynamic Background Elements
    const bgElements = document.querySelectorAll('.bg-element');
    
    // Function to randomly change the size of background elements
    function animateBgElements() {
        bgElements.forEach(element => {
            // Get current width and height
            const currentWidth = parseInt(window.getComputedStyle(element).width);
            const currentHeight = parseInt(window.getComputedStyle(element).height);
            
            // Calculate new size (±20% variation)
            const sizeVariation = 0.2; // 20%
            const widthChange = currentWidth * (1 + (Math.random() * sizeVariation * 2 - sizeVariation));
            const heightChange = currentHeight * (1 + (Math.random() * sizeVariation * 2 - sizeVariation));
            
            // Apply new size
            element.style.width = `${widthChange}px`;
            element.style.height = `${heightChange}px`;
        });
        
        // Schedule next animation
        setTimeout(animateBgElements, 8000); // Change every 8 seconds
    }
    
    // Start background animation
    animateBgElements();
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 500);
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            } else {
                revealElements[i].classList.remove('active');
            }
        }
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const serviceInput = document.getElementById('service');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const serviceError = document.getElementById('serviceError');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Reset error messages
        nameError.classList.add('hidden');
        phoneError.classList.add('hidden');
        emailError.classList.add('hidden');
        serviceError.classList.add('hidden');
        formSuccess.classList.add('hidden');
        formError.classList.add('hidden');

        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.classList.remove('hidden');
            isValid = false;
        }

        // Validate phone (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.classList.remove('hidden');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.classList.remove('hidden');
            isValid = false;
        }

        // Validate service selection
        if (serviceInput.value === '') {
            serviceError.classList.remove('hidden');
            isValid = false;
        }

        // If form is valid, submit it
        if (isValid) {
            // In a real application, you would send the form data to a server here
            // For demo purposes, we'll just show a success message
            formSuccess.classList.remove('hidden');
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(function() {
                formSuccess.classList.add('hidden');
            }, 5000);
        } else {
            formError.classList.remove('hidden');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});