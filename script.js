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

    // Quiz elements
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

    // Quiz Data (10 questions each)
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
                { question: "Which of the following is NOT a type of tree traversal?", options: ["Inorder", "Preorder", "Postorder", "Depth-first"], answer: "Depth-first" }, // DFS is a category, not a specific traversal name like in,pre,postorder
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
            // If navigating away from quiz, hide quiz container
            if (targetId !== 'quizzes') {
                quizContainer.classList.add('hidden');
                quizResultDiv.classList.add('hidden');
                quizQuestionsDiv.innerHTML = ''; // Clear previous questions
                submitQuizBtn.classList.add('hidden');
            }
        });
    });

    // Handle CTA button click on home page
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            showSection('dashboard');
        });
    }

    // Modal functionality (Login/Signup) - Same as before
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

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        console.log('Login attempt:', { email, password });
        alert('Login functionality is for demo purposes. No actual login is performed.');
        loginModal.classList.add('hidden');
    });

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
    });

    // Handle student data form submission - Slight changes to input IDs
    studentDataForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const yearOfStudy = parseInt(document.getElementById('yearOfStudy').value);
        const cgpa = parseFloat(document.getElementById('cgpa').value);
        const expertiseQuiz = parseInt(document.getElementById('expertiseQuiz').value);
        // Updated input IDs for consistency with the new quiz feature
        const communicationQuizScore = parseInt(document.getElementById('communicationQuizInput').value);
        const dsaTopicsCovered = document.getElementById('dsaTopicsCovered').value;
        const dsaQuizScore = parseInt(document.getElementById('dsaQuizInput').value);
        const aptitudeTestScore = parseInt(document.getElementById('aptitudeTestInput').value);

        // --- Placement Readiness Logic ---
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

        document.getElementById('reportStudentName').textContent = studentName;
        document.getElementById('overallReadiness').innerHTML = `${overallReadinessText} (Score: ${readinessScore.toFixed(2)}/100)`;
        document.getElementById('improvementAreas').textContent = improvementFactors.length > 0 ? improvementFactors.join(', ') : 'None';
        document.getElementById('resultCGPA').textContent = `${cgpa} (${normalizedCGPA.toFixed(1)}%)`;
        document.getElementById('resultAptitude').textContent = `${aptitudeTestScore}%`;
        document.getElementById('resultDSA').textContent = `${dsaQuizScore}% (Topics: ${dsaTopicsCovered || 'N/A'})`;
        document.getElementById('resultCommunication').textContent = `${communicationQuizScore}%`;

        readinessResultDiv.classList.remove('hidden');
        readinessResultDiv.scrollIntoView({ behavior: 'smooth' });
    });

    // --- Quiz Functionality ---

    // Load a specific quiz
    const loadQuiz = (quizType) => {
        const quizData = quizzes[quizType];
        if (!quizData) return;

        currentQuizQuestions = quizData.questions;
        quizTitle.textContent = quizData.name;
        quizQuestionsDiv.innerHTML = ''; // Clear previous questions
        quizResultDiv.classList.add('hidden'); // Hide result section
        submitQuizBtn.classList.remove('hidden'); // Show submit button

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

    // Handle quiz selection button clicks
    quizSelectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const quizType = e.target.dataset.quiz;
            loadQuiz(quizType);
        });
    });

    // Handle quiz submission
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
                // If no option is selected, it's considered wrong
                wrongCount++;
            }
        });

        // Calculate score out of 100 for a 10 question quiz
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
        submitQuizBtn.classList.add('hidden'); // Hide submit button after submission
        quizQuestionsDiv.innerHTML = ''; // Clear questions after showing results
        quizResultDiv.scrollIntoView({ behavior: 'smooth' });
    });


    // Initially show the home section
    showSection('home');
});