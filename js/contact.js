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

    if (name.length < 5) {
        nameError.textContent = 'Name must be more than 5 characters long';
        return;
    }

    //Validate email field with regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Invalid email address';
        return;
    }

    if (subject.length < 15) {
        subjectError.textContent = 'Subject must be more than 15 characters long';
        return;
    }

    if (message.length < 25) {
        messageError.textContent = 'Message content must be more than 25 characters long';
        return;
    }
}