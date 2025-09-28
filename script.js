document.addEventListener('DOMContentLoaded', () => {
    // --- General DOM Elements ---
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const ctaButton = document.querySelector('.cta-button');

    // --- Modal Elements ---
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeButtons = document.querySelectorAll('.modal .close-button'); // Selects close buttons within modals

    // --- Login Form Elements ---
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginEmailError = document.getElementById('loginEmailError');
    const loginPasswordError = document.getElementById('loginPasswordError');

    // --- Signup Form Elements ---
    const signupForm = document.getElementById('signupForm');
    const signupNameInput = document.getElementById('signupName');
    const signupEmailInput = document.getElementById('signupEmail');
    const signupPasswordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const signupNameError = document.getElementById('signupNameError');
    const signupEmailError = document.getElementById('signupEmailError');
    const signupPasswordError = document.getElementById('signupPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // --- Dashboard Elements ---
    const studentDataForm = document.getElementById('studentDataForm');
    const readinessResultDiv = document.getElementById('readinessResult');
    const reportStudentName = document.getElementById('reportStudentName');
    const overallReadiness = document.getElementById('overallReadiness');
    const improvementAreas = document.getElementById('improvementAreas');
    const resultCGPA = document.getElementById('resultCGPA');
    const resultAptitude = document.getElementById('resultAptitude');
    const resultDSA = document.getElementById('resultDSA');
    const resultCommunication = document.getElementById('resultCommunication');

    // --- Quiz Elements ---
    const quizSelectBtns = document.querySelectorAll('.quiz-select-btn');
    const quizContainer = document.getElementById('quizContainer');
    const quizTitle = document.getElementById('quizTitle');
    const quizQuestionsDiv = document.getElementById('quizQuestions');
    const submitQuizBtn = document.getElementById('submitQuizBtn');
    const quizResultDiv = document.getElementById('quizResult');
    const resultQuizName = document.getElementById('resultQuizName');
    const correctAnswersSpan = document.getElementById('correctAnswers');
    const wrongAnswersSpan = document.getElementById('wrongAnswers');
    const quizRemarksSpan = document.getElementById('quizRemarks');

    let currentQuizQuestions = []; // Stores questions for the active quiz

    // --- Quiz Data (10 questions each) ---
    const quizzes = {
        communication: {
            name: "Communication Quiz",
            questions: [
                { question: "Which of these is NOT a component of effective communication?", options: ["Active Listening", "Clarity", "Empathy", "Monologuing"], answer: "Monologuing" },
                { question: "What is the primary purpose of non-verbal communication?", options: ["To distract the listener", "To provide factual information", "To reinforce or contradict verbal messages", "To prove a point"], answer: "To reinforce or contradict verbal messages" },
                { question: "When giving feedback, it's best to be:", options: ["Vague and general", "Critical and judgmental", "Specific and constructive", "Solely positive"], answer: "Specific and constructive" },
                { question: "Which barrier to communication involves different interpretations of words?", options: ["Physical barrier", "Semantic barrier", "Psychological barrier", "Emotional barrier"], answer: "Semantic barrier" },
                { question: "A good communicator often uses 'I' statements to:", options: ["Blame others", "Express personal feelings and take responsibility", "Sound more authoritative", "Avoid discussion"], answer: "Express personal feelings and take responsibility" },
                { question: "What does 'empathy' mean in communication?", options: ["Feeling sorry for someone", "Understanding and sharing the feelings of another", "Ignoring others' feelings", "Always agreeing with others"], answer: "Understanding and sharing the feelings of another" },
                { question: "What is active listening?", options: ["Listening only to respond", "Listening passively while doing other tasks", "Paying full attention, understanding, responding appropriately", "Interrupting to ask questions"], answer: "Paying full attention, understanding, responding appropriately" },
                { question: "Which of these improves written communication?", options: ["Using complex jargon", "Ignoring proofreading", "Clear, concise language and proper grammar", "Long, rambling sentences"], answer: "Clear, concise language and proper grammar" },
                { question: "What is a common sign of good eye contact in communication?", options: ["Staring intently without blinking", "Avoiding eye contact completely", "Maintaining comfortable, intermittent eye contact", "Looking at the floor"], answer: "Maintaining comfortable, intermittent eye contact" },
                { question: "Why is knowing your audience important in communication?", options: ["To manipulate them", "To tailor your message for maximum impact", "To show off your vocabulary", "It's not important"], answer: "To tailor your message for maximum impact" }
            ]
        },
        aptitude: {
            name: "Aptitude Quiz",
            questions: [
                { question: "If a car travels at 60 km/h, how far will it travel in 3.5 hours?", options: ["180 km", "210 km", "240 km", "150 km"], answer: "210 km" },
                { question: "What is 15% of 200?", options: ["15", "20", "30", "45"], answer: "30" },
                { question: "If A is twice as fast as B, and B can complete a work in 12 days, then the number of days in which A and B can together complete the work is:", options: ["4 days", "6 days", "8 days", "10 days"], answer: "4 days" },
                { question: "Find the missing number in the series: 2, 4, 8, 16, __", options: ["20", "24", "30", "32"], answer: "32" },
                { question: "A fruit seller had some apples. He sells 40% apples and still has 540 apples. Originally, he had:", options: ["600 apples", "800 apples", "900 apples", "1000 apples"], answer: "900 apples" },
                { question: "What is the square root of 144?", options: ["10", "11", "12", "13"], answer: "12" },
                { question: "A train 120m long is running with a speed of 60 km/h. In what time will it pass a pole?", options: ["6.2 sec", "7.2 sec", "8 sec", "9 sec"], answer: "7.2 sec" },
                { question: "If 6 men can complete a piece of work in 10 days, how many days will 10 men take to complete the same work?", options: ["4 days", "6 days", "8 days", "10 days"], answer: "6 days" },
                { question: "Which fraction is the largest? 1/2, 3/4, 2/3, 5/8", options: ["1/2", "3/4", "2/3", "5/8"], answer: "3/4" },
                { question: "The average of first 50 natural numbers is:", options: ["25", "25.5", "26", "26.5"], answer: "25.5" }
            ]
        },
        dsa: {
            name: "DSA Quiz",
            questions: [
                { question: "Which data structure uses LIFO (Last In, First Out) principle?", options: ["Queue", "Stack", "Linked List", "Tree"], answer: "Stack" },
                { question: "What is the time complexity of searching an element in a sorted array using Binary Search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: "O(log n)" },
                { question: "Which of the following is NOT a type of tree traversal?", options: ["Inorder", "Preorder", "Postorder", "Depth-first"], answer: "Depth-first" },
                { question: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n^2)", "O(log n)", "O(n)"], answer: "O(n^2)" },
                { question: "A 'doubly linked list' allows traversal in:", options: ["Forward direction only", "Backward direction only", "Both forward and backward directions", "Random access direction"], answer: "Both forward and backward directions" },
                { question: "Which algorithm finds the shortest path from a single source vertex to all other vertices in a graph with non-negative edge weights?", options: ["Bellman-Ford", "Floyd-Warshall", "Dijkstra's", "Prim's"], answer: "Dijkstra's" },
                { question: "In a Hash Table, what is a collision?", options: ["When two keys hash to different indices", "When two different keys hash to the same index", "When a key cannot be hashed", "When the table is full"], answer: "When two different keys hash to the same index" },
                { question: "Which sorting algorithm has the best average-case time complexity?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], answer: "Merge Sort" },
                { question: "Which of these is used to implement recursion?", options: ["Queue", "Stack", "Heap", "Hash Table"], answer: "Stack" },
                { question: "The maximum number of nodes at level 'l' of a binary tree is:", options: ["2^l", "2^(l-1)", "2^(l+1)", "l^2"], answer: "2^l" }
            ]
        }
    };

    // --- Utility Functions ---

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Generic validation function
    function validateInput(inputElement, errorElement, validationFn, errorMessage) {
        const value = inputElement.value.trim();
        let isValid = true;
        let message = '';

        if (inputElement.hasAttribute('required') && value === '') {
            isValid = false;
            message = 'This field is mandatory.';
        } else if (!validationFn(value)) {
            isValid = false;
            message = errorMessage;
        }

        errorElement.textContent = message;
        if (isValid) {
            inputElement.classList.remove('is-invalid');
        } else {
            inputElement.classList.add('is-invalid');
        }
        return isValid;
    }

    // Password strength check for signup
    const isPasswordStrong = (value) => {
        return value.length >= 8 &&
               /[A-Z]/.test(value) &&    // At least one uppercase
               /[a-z]/.test(value) &&    // At least one lowercase
               /[0-9]/.test(value);      // At least one number
    };

    // --- Section Navigation ---
    const showSection = (id) => {
        sections.forEach(section => {
            if (section.id === id) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
        document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            // Hide quiz elements when navigating away from quizzes
            if (targetId !== 'quizzes') {
                quizContainer.classList.add('hidden');
                quizResultDiv.classList.add('hidden');
                quizQuestionsDiv.innerHTML = '';
                submitQuizBtn.classList.add('hidden');
            }
        });
    });

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            showSection('dashboard');
        });
    }

    // --- Modal Logic (Open/Close) ---
    const openModal = (modalElement) => {
        modalElement.classList.remove('hidden');
        modalElement.style.display = 'flex'; // Ensure flex for centering
        clearAuthErrors(); // Clear errors on opening a modal
    };

    const closeModal = (modalElement) => {
        modalElement.classList.add('hidden');
        modalElement.style.display = 'none';
        clearAuthErrors(); // Clear errors on closing a modal
    };

    loginBtn.addEventListener('click', () => openModal(loginModal));
    signupBtn.addEventListener('click', () => openModal(signupModal));

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const parentModal = e.target.closest('.modal');
            if (parentModal) closeModal(parentModal);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            closeModal(loginModal);
        }
        if (event.target === signupModal) {
            closeModal(signupModal);
        }
    });

    // --- Login Form Functionality ---
    loginEmailInput.addEventListener('input', () => {
        validateInput(loginEmailInput, loginEmailError, (value) => emailRegex.test(value), 'Please enter a valid email address.');
    });
    loginPasswordInput.addEventListener('input', () => {
        validateInput(loginPasswordInput, loginPasswordError, (value) => value.length > 0, 'Password cannot be empty.');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Crucial: Stop default form submission

        // Run all validations and store their results
        const isEmailValid = validateInput(loginEmailInput, loginEmailError, (value) => emailRegex.test(value), 'Please enter a valid email address.');
        const isPasswordValid = validateInput(loginPasswordInput, loginPasswordError, (value) => value.length > 0, 'Password cannot be empty.');

        if (isEmailValid && isPasswordValid) {
            console.log('Login successful! (Demo only)');
            alert('Login successful! Welcome!');
            closeModal(loginModal);
        } else {
            console.log('Login validation failed.');
        }
    });

    // --- Signup Form Functionality ---
    signupNameInput.addEventListener('input', () => {
        validateInput(signupNameInput, signupNameError, (value) => value.length >= 2, 'Name must be at least 2 characters.');
    });
    signupEmailInput.addEventListener('input', () => {
        validateInput(signupEmailInput, signupEmailError, (value) => emailRegex.test(value), 'Please enter a valid email address.');
    });
    signupPasswordInput.addEventListener('input', () => {
        validateInput(signupPasswordInput, signupPasswordError, isPasswordStrong, 'Password must be at least 8 chars, incl. uppercase, lowercase, and a number.');
        // Re-validate confirm password if main password changes
        validateInput(confirmPasswordInput, confirmPasswordError, (value) => value === signupPasswordInput.value && value.length > 0, 'Passwords do not match.');
    });
    confirmPasswordInput.addEventListener('input', () => {
        validateInput(confirmPasswordInput, confirmPasswordError, (value) => value === signupPasswordInput.value && value.length > 0, 'Passwords do not match.');
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Crucial: Stop default form submission

        // Run all validations and store their results
        const isNameValid = validateInput(signupNameInput, signupNameError, (value) => value.length >= 2, 'Name must be at least 2 characters.');
        const isEmailValid = validateInput(signupEmailInput, signupEmailError, (value) => emailRegex.test(value), 'Please enter a valid email address.');
        const isPasswordValid = validateInput(signupPasswordInput, signupPasswordError, isPasswordStrong, 'Password must be at least 8 chars, incl. uppercase, lowercase, and a number.');
        const isConfirmPasswordValid = validateInput(confirmPasswordInput, confirmPasswordError, (value) => value === signupPasswordInput.value && value.length > 0, 'Passwords do not match.');

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            console.log('Signup successful! (Demo only)');
            alert('Signup successful! Welcome!');
            closeModal(signupModal);
        } else {
            console.log('Signup validation failed.');
        }
    });

    // --- Student Dashboard Form Functionality (unchanged) ---
    studentDataForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const yearOfStudy = parseInt(document.getElementById('yearOfStudy').value);
        const cgpa = parseFloat(document.getElementById('cgpa').value);
        const expertiseQuiz = parseInt(document.getElementById('expertiseQuiz').value);
        const communicationQuizScore = parseInt(document.getElementById('communicationQuizInput').value);
        const dsaTopicsCovered = document.getElementById('dsaTopicsCovered').value;
        const dsaQuizScore = parseInt(document.getElementById('dsaQuizInput').value);
        const aptitudeTestScore = parseInt(document.getElementById('aptitudeTestInput').value);

        let readinessScore = 0;
        let improvementFactors = [];

        const weights = {
            cgpa: 0.2,
            aptitude: 0.25,
            dsa: 0.3,
            communication: 0.15,
            expertise: 0.1
        };

        const normalizedCGPA = (cgpa / 10) * 100;

        const scoreCGPA = normalizedCGPA * weights.cgpa;
        const scoreAptitude = aptitudeTestScore * weights.aptitude;
        const scoreDSA = dsaQuizScore * weights.dsa;
        const scoreCommunication = communicationQuizScore * weights.communication;
        const scoreExpertise = expertiseQuiz * weights.expertise;

        readinessScore = scoreCGPA + scoreAptitude + scoreDSA + scoreCommunication + scoreExpertise;

        if (normalizedCGPA < 70) improvementFactors.push('CGPA');
        if (aptitudeTestScore < 60) improvementFactors.push('Aptitude');
        if (dsaQuizScore < 60) improvementFactors.push('DSA Skills');
        if (communicationQuizScore < 70) improvementFactors.push('Communication Skills');
        if (expertiseQuiz < 60) improvementFactors.push('Domain Expertise');

        let overallReadinessText = '';
        if (readinessScore >= 80) {
            overallReadinessText = '<span style="color: green; font-weight: bold;">Ready!</span>';
        } else if (readinessScore >= 60) {
            overallReadinessText = '<span style="color: orange; font-weight: bold;">Nearly Ready, needs some improvement.</span>';
        } else {
            overallReadinessText = '<span style="color: red; font-weight: bold;">Needs significant improvement.</span>';
        }

        reportStudentName.textContent = studentName;
        overallReadiness.innerHTML = `${overallReadinessText} (Score: ${readinessScore.toFixed(2)}/100)`;
        improvementAreas.textContent = improvementFactors.length > 0 ? improvementFactors.join(', ') : 'None';
        resultCGPA.textContent = `${cgpa} (${normalizedCGPA.toFixed(1)}%)`;
        resultAptitude.textContent = `${aptitudeTestScore}%`;
        resultDSA.textContent = `${dsaQuizScore}% (Topics: ${dsaTopicsCovered || 'N/A'})`;
        resultCommunication.textContent = `${communicationQuizScore}%`;

        readinessResultDiv.classList.remove('hidden');
        readinessResultDiv.scrollIntoView({ behavior: 'smooth' });
    });

    // --- Quiz Functionality (unchanged) ---
    const loadQuiz = (quizType) => {
        const quizData = quizzes[quizType];
        if (!quizData) return;

        currentQuizQuestions = quizData.questions;
        quizTitle.textContent = quizData.name;
        quizQuestionsDiv.innerHTML = '';
        quizResultDiv.classList.add('hidden');
        submitQuizBtn.classList.remove('hidden');

        currentQuizQuestions.forEach((q, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');
            questionBlock.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

            q.options.forEach(option => {
                const label = document.createElement('label');
                label.innerHTML = `
                    <input type="radio" name="question${index}" value="${option}">
                    ${option}
                `;
                questionBlock.appendChild(label);
            });
            quizQuestionsDiv.appendChild(questionBlock);
        });

        quizContainer.classList.remove('hidden');
        quizContainer.scrollIntoView({ behavior: 'smooth' });
    };

    quizSelectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const quizType = e.target.dataset.quiz;
            loadQuiz(quizType);
        });
    });

    submitQuizBtn.addEventListener('click', () => {
        let correctCount = 0;
        let wrongCount = 0;
        const totalQuestions = currentQuizQuestions.length;

        currentQuizQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                if (selectedOption.value === q.answer) {
                    correctCount++;
                } else {
                    wrongCount++;
                }
            } else {
                wrongCount++; // Count unanswered as wrong
            }
        });

        const scorePercentage = (correctCount / totalQuestions) * 100;
        let remarks = '';
        if (scorePercentage >= 80) {
            remarks = 'Excellent performance! You have a strong grasp of the concepts.';
        } else if (scorePercentage >= 60) {
            remarks = 'Good effort! You understand most concepts but there\'s room for improvement.';
        } else if (scorePercentage >= 40) {
            remarks = 'Keep practicing! Focus on understanding the fundamentals.';
        } else {
            remarks = 'Needs significant study. Review the basics thoroughly.';
        }

        resultQuizName.textContent = quizTitle.textContent;
        correctAnswersSpan.textContent = correctCount;
        wrongAnswersSpan.textContent = wrongCount;
        quizRemarksSpan.textContent = remarks;

        quizResultDiv.classList.remove('hidden');
        submitQuizBtn.classList.add('hidden');
        quizQuestionsDiv.innerHTML = '';
        quizResultDiv.scrollIntoView({ behavior: 'smooth' });
    });


    // --- Initial Setup ---
    showSection('home');
});