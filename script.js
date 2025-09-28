document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeButtons = document.querySelectorAll('.close-button');
    const studentDataForm = document.getElementById('studentDataForm');
    const readinessResultDiv = document.getElementById('readinessResult');
    const ctaButton = document.querySelector('.cta-button');

    // Function to show a specific section and hide others
    const showSection = (id) => {
        sections.forEach(section => {
            if (section.id === id) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
        // Scroll to the top of the main content area
        document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
    };

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Remove '#'
            showSection(targetId);
        });
    });

    // Handle CTA button click on home page
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            showSection('dashboard');
        });
    }

    // Modal functionality
    loginBtn.addEventListener('click', () => {
        loginModal.classList.remove('hidden');
    });

    signupBtn.addEventListener('click', () => {
        signupModal.classList.remove('hidden');
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.classList.add('hidden');
            signupModal.classList.add('hidden');
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.classList.add('hidden');
        }
        if (event.target == signupModal) {
            signupModal.classList.add('hidden');
        }
    });

    // Handle login form submission (for front-end demo, just log to console)
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        console.log('Login attempt:', { email, password });
        alert('Login functionality is for demo purposes. No actual login is performed.');
        loginModal.classList.add('hidden');
        // In a real app, you'd send this to a backend for authentication
    });

    // Handle signup form submission (for front-end demo, just log to console)
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Signup attempt:', { name, email, password });
        alert('Signup functionality is for demo purposes. No actual registration is performed.');
        signupModal.classList.add('hidden');
        // In a real app, you'd send this to a backend for user registration
    });

    // Handle student data form submission
    studentDataForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const yearOfStudy = parseInt(document.getElementById('yearOfStudy').value);
        const cgpa = parseFloat(document.getElementById('cgpa').value);
        const expertiseQuiz = parseInt(document.getElementById('expertiseQuiz').value);
        const communicationQuiz = parseInt(document.getElementById('communicationQuiz').value);
        const dsaTopicsCovered = document.getElementById('dsaTopicsCovered').value;
        const dsaQuiz = parseInt(document.getElementById('dsaQuiz').value);
        const aptitudeTest = parseInt(document.getElementById('aptitudeTest').value);

        // --- Placement Readiness Logic ---
        let readinessScore = 0;
        let improvementFactors = [];

        // Example weighting (you can adjust these based on your criteria)
        const weights = {
            cgpa: 0.2,
            aptitude: 0.25,
            dsa: 0.3,
            communication: 0.15,
            expertise: 0.1
        };

        // Normalize scores (assuming out of 100 for quizzes/aptitude, out of 10 for CGPA)
        const normalizedCGPA = (cgpa / 10) * 100; // Convert 0-10 to 0-100 scale

        // Calculate weighted scores
        const scoreCGPA = normalizedCGPA * weights.cgpa;
        const scoreAptitude = aptitudeTest * weights.aptitude;
        const scoreDSA = dsaQuiz * weights.dsa;
        const scoreCommunication = communicationQuiz * weights.communication;
        const scoreExpertise = expertiseQuiz * weights.expertise;

        readinessScore = scoreCGPA + scoreAptitude + scoreDSA + scoreCommunication + scoreExpertise;

        // Determine improvement areas based on thresholds (example thresholds)
        if (normalizedCGPA < 70) improvementFactors.push('CGPA');
        if (aptitudeTest < 60) improvementFactors.push('Aptitude');
        if (dsaQuiz < 60) improvementFactors.push('DSA Skills');
        if (communicationQuiz < 70) improvementFactors.push('Communication Skills');
        if (expertiseQuiz < 60) improvementFactors.push('Domain Expertise');

        let overallReadinessText = '';
        if (readinessScore >= 80) {
            overallReadinessText = '<span style="color: green; font-weight: bold;">Ready!</span>';
        } else if (readinessScore >= 60) {
            overallReadinessText = '<span style="color: orange; font-weight: bold;">Nearly Ready, needs some improvement.</span>';
        } else {
            overallReadinessText = '<span style="color: red; font-weight: bold;">Needs significant improvement.</span>';
        }

        // Display results
        document.getElementById('reportStudentName').textContent = studentName;
        document.getElementById('overallReadiness').innerHTML = `${overallReadinessText} (Score: ${readinessScore.toFixed(2)}/100)`;
        document.getElementById('improvementAreas').textContent = improvementFactors.length > 0 ? improvementFactors.join(', ') : 'None';
        document.getElementById('resultCGPA').textContent = `${cgpa} (${normalizedCGPA.toFixed(1)}%)`;
        document.getElementById('resultAptitude').textContent = `${aptitudeTest}%`;
        document.getElementById('resultDSA').textContent = `${dsaQuiz}% (Topics: ${dsaTopicsCovered || 'N/A'})`;
        document.getElementById('resultCommunication').textContent = `${communicationQuiz}%`;

        readinessResultDiv.classList.remove('hidden');
        readinessResultDiv.scrollIntoView({ behavior: 'smooth' }); // Scroll to the result
    });

    // Initially show the home section
    showSection('home');
});