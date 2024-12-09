// Register User
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            if (response.status === 201) {
                alert('Registration successful!');
                window.location.href = 'login.html'; // Redirect to login
            } else {
                const data = await response.json();
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    });
}

// Login User (Mock Example)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const usersResponse = await fetch('http://localhost:5000/api/users');
            const users = await usersResponse.json();

            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                alert('Login successful!');
                window.location.href = 'dashboard.html'; // Redirect to dashboard (or a new page)
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    });
}
