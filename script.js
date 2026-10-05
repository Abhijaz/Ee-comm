document.addEventListener('DOMContentLoaded', () => {
  // 1. Display Current Date
  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);
  }

  // 2. Category Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      newsCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Dynamic Like Button Counter
  const likeBtns = document.querySelectorAll('.like-btn');
  likeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const countSpan = btn.querySelector('.like-count');
      let currentLikes = parseInt(countSpan.textContent, 10);
      countSpan.textContent = currentLikes + 1;
    });
  });

  // 4. Form Validation & DOM Queue Injection
  const form = document.getElementById('factCheckForm');
  const queueList = document.getElementById('queueList');
  const successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Input elements
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const claimUrl = document.getElementById('claimUrl').value.trim();
    const tipDetails = document.getElementById('tipDetails').value.trim();

    // Reset error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('urlError').textContent = '';
    document.getElementById('tipError').textContent = '';
    successMsg.textContent = '';

    let isValid = true;

    // Name Validation
    if (fullName === '') {
      document.getElementById('nameError').textContent = 'Reporter name is required.';
      isValid = false;
    }

    // Email Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Enter a valid email address.';
      isValid = false;
    }

    // URL Regex Validation
    const urlRegex = /^(https?:\/\/)?([\w\d\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(claimUrl)) {
      document.getElementById('urlError').textContent = 'Enter a valid web URL.';
      isValid = false;
    }

    // Details Length Validation
    if (tipDetails.length < 20) {
      document.getElementById('tipError').textContent = 'Details must be at least 20 characters long.';
      isValid = false;
    }

    // If valid, append to live queue via DOM Manipulation
    if (isValid) {
      // Clear placeholder text if first entry
      const emptyMsg = queueList.querySelector('.empty-queue');
      if (emptyMsg) {
        emptyMsg.remove();
      }

      // Create new list item
      const li = document.createElement('li');
      li.className = 'queue-item';
      li.innerHTML = `<strong>[Pending Review]</strong> ${fullName} reported: <em>"${tipDetails.substring(0, 50)}..."</em> (<a href="${claimUrl}" target="_blank">Source Link</a>)`;

      queueList.prepend(li);

      successMsg.textContent = 'Fact-check tip successfully submitted to newsroom!';
      form.reset();
    }
  });
});
