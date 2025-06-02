document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const rsvpForm = document.getElementById('rsvp-form');
  const confirmation = document.getElementById('confirmation');
  const attendingSelect = document.getElementById('attending');
  const guestsContainer = document.getElementById('guests-container');
  const menuContainer = document.getElementById('menu-container');

  // Show/hide guests number field based on attendance
  if (attendingSelect) {
    attendingSelect.addEventListener('change', function() {
      if (this.value === 'yes') {
        if (guestsContainer) guestsContainer.style.display = 'block';
        if (menuContainer) menuContainer.style.display = 'block';
      } else {
        if (guestsContainer) guestsContainer.style.display = 'none';
        if (menuContainer) menuContainer.style.display = 'none';
      }
    });
  }

  // Initially hide menu selection if not attending
  if (attendingSelect && attendingSelect.value !== 'yes' && menuContainer) {
    menuContainer.style.display = 'none';
  }

  // Form submission
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      const nameElement = document.getElementById('name');
      const emailElement = document.getElementById('email');
      
      if (!nameElement || !emailElement || !attendingSelect) {
        console.error('Required form elements not found');
        return;
      }
      
      const name = nameElement.value;
      const email = emailElement.value;
      const attending = attendingSelect.value;
      
      if (!name || !email || !attending) {
        alert('Vă rugăm să completați toate câmpurile obligatorii.');
        return;
      }
      
      // Additional validation for menu selection if attending
      if (attending === 'yes') {
        const menuSelection = document.getElementById('menu');
        if (menuSelection && !menuSelection.value) {
          alert('Vă rugăm să selectați preferința pentru meniu.');
          return;
        }
      }
      
      // In a real application, you would send this data to a server
      // For this demo, we'll just show a confirmation message
      rsvpForm.style.display = 'none';
      if (confirmation) confirmation.classList.remove('hidden');
      
      // Log form data (for demonstration purposes)
      const formData = {
        name,
        email,
        attending
      };
      
      if (attending === 'yes') {
        const guestsElement = document.getElementById('guests');
        const menuElement = document.getElementById('menu');
        const messageElement = document.getElementById('message');
        
        if (guestsElement) formData.guests = guestsElement.value;
        if (menuElement) formData.menuPreference = menuElement.value;
        if (messageElement) formData.message = messageElement.value;
      }
      
      console.log(formData);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Reorder elements for mobile view
  function handleMobileLayout() {
    const container = document.querySelector('.container');
    if (container && window.innerWidth <= 768) {
      // Apply mobile-specific ordering
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
    } else if (container) {
      // Reset for desktop
      container.style.display = '';
      container.style.flexDirection = '';
    }
  }
  
  // Initial check
  handleMobileLayout();
  
  // Listen for window resize
  window.addEventListener('resize', handleMobileLayout);
  
  // Countdown Timer
  function updateCountdown() {
    const weddingDate = new Date('September 13, 2025 16:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;
    
    // Get countdown elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // If any element is missing, don't proceed
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
      return;
    }
    
    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Update DOM
    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
    
    // If the countdown is over
    if (timeLeft < 0) {
      clearInterval(countdownTimer);
      daysElement.textContent = '0';
      hoursElement.textContent = '0';
      minutesElement.textContent = '0';
      secondsElement.textContent = '0';
    }
  }
  
  // Initial countdown update and set interval only if elements exist
  if (document.getElementById('days') && 
      document.getElementById('hours') && 
      document.getElementById('minutes') && 
      document.getElementById('seconds')) {
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
  }
});
