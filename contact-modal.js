// Universal Contact Modal JavaScript
class ContactModal {
  constructor() {
    this.modal = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    // Create modal HTML if it doesn't exist
    if (!document.getElementById('universalContactModal')) {
      this.createModal();
    }
    this.modal = document.getElementById('universalContactModal');
    this.bindEvents();
  }

  createModal() {
    const modalHTML = `
      <div id="universalContactModal" class="contact-modal">
        <div class="contact-modal-content">
          <span class="contact-modal-close">&times;</span>
          <h2>Get in Touch</h2>
          <form class="contact-modal-form" id="universalContactForm">
            <div class="contact-form-group">
              <input type="text" id="contactName" name="name" placeholder="Your Name" required>
            </div>
            <div class="contact-form-group">
              <input type="email" id="contactEmail" name="email" placeholder="Your Email" required>
            </div>
            <div class="contact-form-group">
              <input type="tel" id="contactPhone" name="phone" placeholder="Your Phone" required>
            </div>
            <div class="contact-form-group">
              <textarea id="contactIdea" name="idea" placeholder="Tell us about your project idea..." rows="4" required></textarea>
            </div>
            <button type="submit" class="contact-submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  bindEvents() {
    const closeBtn = this.modal.querySelector('.contact-modal-close');
    const form = this.modal.querySelector('#universalContactForm');
    
    // Close button
    closeBtn.addEventListener('click', () => this.close());
    
    // Click outside to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Form submission
    form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  open() {
    this.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
    
    // Focus on first input after animation
    setTimeout(() => {
      const firstInput = this.modal.querySelector('#contactName');
      if (firstInput) firstInput.focus();
    }, 300);
  }

  close() {
    this.modal.style.display = 'none';
    document.body.style.overflow = '';
    this.isOpen = false;
    this.resetForm();
  }

  resetForm() {
    const form = this.modal.querySelector('#universalContactForm');
    if (form) form.reset();
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const submitBtn = this.modal.querySelector('.contact-submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    const formData = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      phone: document.getElementById('contactPhone').value,
      idea: document.getElementById('contactIdea').value
    };
    
    try {
      const response = await fetch('/api/customize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        this.showSuccess('Thank you! Your message has been sent successfully.');
        this.resetForm();
        setTimeout(() => this.close(), 2000);
      } else {
        throw new Error(result.error || 'Something went wrong');
      }
    } catch (error) {
      this.showError('Error: Unable to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showSuccess(message) {
    this.showMessage(message, 'success');
  }

  showError(message) {
    this.showMessage(message, 'error');
  }

  showMessage(message, type) {
    // Remove existing message
    const existingMsg = this.modal.querySelector('.contact-message');
    if (existingMsg) existingMsg.remove();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `contact-message contact-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      padding: 15px;
      margin: 20px 0;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
      ${type === 'success' 
        ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
        : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
      }
    `;
    
    const form = this.modal.querySelector('.contact-modal-form');
    form.insertAdjacentElement('afterend', messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (messageDiv && messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
}

// Global functions for backward compatibility
let universalContactModal;

function showContactModal() {
  if (!universalContactModal) {
    universalContactModal = new ContactModal();
  }
  universalContactModal.open();
}

function closeContactModal() {
  if (universalContactModal) {
    universalContactModal.close();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  universalContactModal = new ContactModal();
});

// Initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    universalContactModal = new ContactModal();
  });
} else {
  universalContactModal = new ContactModal();
}