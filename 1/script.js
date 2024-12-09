document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the form
    document.getElementById("registerForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const name = document.getElementById("name").value.trim();
        const dob = document.getElementById("dob").value;
        const location = document.getElementById("location").value;
        const subject = document.getElementById("subject").value;

        // Validate the name to disallow leading/trailing special characters
        const specialCharRegex = /^[\W_]|[\W_]$/;
        if (specialCharRegex.test(name)) {
            alert("Name cannot have leading or trailing special characters.");
            return; // Stop form submission if invalid
        }

        // Calculate age based on DOB
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();

        // Adjust age if the birthday hasn't happened yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        // Show an alert with all the details including age
        alert(`Name: ${name}\nDate of Birth: ${dob} (${age} years old)\nLocation: ${location}\nSubject: ${subject}`);
    });
});
