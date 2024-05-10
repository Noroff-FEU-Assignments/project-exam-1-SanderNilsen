//Function to validate form input when submitted
function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    //Clear error messages
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';

    let isValid = true;

    if (name.length < 5) {
        nameError.textContent = 'Name must be more than 5 characters long';
        isValid = false;
    }
    
    //Validate email field with regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Invalid email address';
        isValid = false;
    }

    if (subject.length < 15) {
        subjectError.textContent = 'Subject must be more than 15 characters long';
        isValid = false;
    }

    if (message.length < 25) {
        messageError.textContent = 'Message content must be more than 25 characters long';
        isValid = false;
    }

    if (isValid) {
        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        //HTTP POST request to WordPress REST API
        fetch('https://sandernilsen.com/wp-json/contact-form/v1/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                alert('Your message has been sent!');
                //Resets the form after successful submission
                document.getElementById('contactForm').reset();
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        });
    }
}
