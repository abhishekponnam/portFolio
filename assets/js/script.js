/* =====================================================
   Portfolio Site Script
   Handles: Navigation + Contact Form Interactivity
===================================================== */

// ===== Navigation handling =====
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("article[data-page]");
const form = document.querySelector("[data-form]");
const status = document.getElementById("form-status");
const formInputs = document.querySelectorAll("[data-form-input]");
const submitBtn = document.querySelector("[data-form-btn]");


navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Switch active nav item
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Show the matching page
    const targetPage = link.innerText.toLowerCase();
    pages.forEach((page) => {
      if (page.getAttribute("data-page") === targetPage) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });
  });
});

if (formInputs.length && submitBtn) {
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      let allFilled = true;
      formInputs.forEach((field) => {
        if (!field.value.trim()) {
          allFilled = false;
        }
      });
      submitBtn.disabled = !allFilled;
    });
  });
}

// ===== Contact form handling =====

if (formInputs.length && submitBtn) {
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      // Check if all inputs are filled
      const allFilled = Array.from(formInputs).every(
        (field) => field.value.trim() !== ""
      );
      submitBtn.disabled = !allFilled;
    });
  });
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = "✅ Thank you! Your message has been sent.";
        status.className = "form-status success";
        form.reset();
        submitBtn.disabled = true; // lock again until re-filled
      } else {
        const result = await response.json();
        status.textContent = result.errors
          ? result.errors.map((err) => err.message).join(", ")
          : "❌ Oops! Something went wrong.";
        status.className = "form-status error";
      }
    } catch (error) {
      status.textContent = "❌ Network error. Please try again.";
      status.className = "form-status error";
    }
  });
}

