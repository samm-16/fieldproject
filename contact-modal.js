// Inside handleSubmit method
const formData = {
  name: document.getElementById('contactName').value,
  email: document.getElementById('contactEmail').value,
  message: document.getElementById('contactIdea').value // renamed from 'idea' to match backend
};

try {
  const response = await fetch('/api/contact', { // changed from /api/customize
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
  submitBtn.textContent = originalText;
  submitBtn.disabled = false;
}
