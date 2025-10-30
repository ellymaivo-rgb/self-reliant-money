// Course-specific JavaScript functionality
let currentLesson = 1;
let completedLessons = [];
const totalLessons = 6;

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Analytics tracking
function trackEvent(eventName, eventData) {
    console.log('Event:', eventName, eventData);
    // Add Google Analytics or other tracking here
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize course progress
    updateProgress();
    
    // Update navigation buttons on load
    updateNavigationButtons();
    
    // Lesson navigation
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.addEventListener('click', function() {
            const lessonNumber = parseInt(this.dataset.lesson);
            switchToLesson(lessonNumber);
        });
    });
    
    // Auto-save progress to localStorage
    loadProgress();
});

function switchToLesson(lessonNumber) {
    // Hide all lessons
    document.querySelectorAll('.lesson-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show selected lesson
    const targetLesson = document.getElementById(`lesson-${lessonNumber}`);
    if (targetLesson) {
        targetLesson.style.display = 'block';
        currentLesson = lessonNumber;
        
        // Update sidebar
        updateSidebar();
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Track lesson view
        trackEvent('lesson_view', {
            lesson_number: lessonNumber,
            course: 'budgeting'
        });
    }
}

function updateSidebar() {
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.classList.remove('active');
        const lessonNum = parseInt(item.dataset.lesson);
        
        if (lessonNum === currentLesson) {
            item.classList.add('active');
        }
        
        if (completedLessons.includes(lessonNum)) {
            item.classList.add('completed');
        }
    });
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-lesson');
    const nextBtn = document.querySelector('.next-lesson');
    
    if (prevBtn) {
        prevBtn.disabled = currentLesson === 1;
        prevBtn.style.display = currentLesson === 1 ? 'none' : 'inline-block';
    }
    
    if (nextBtn) {
        if (currentLesson === totalLessons) {
            nextBtn.textContent = 'Kết Thúc Khóa Học';
        } else {
            nextBtn.textContent = 'Bài Tiếp Theo';
        }
    }
}

function nextLesson() {
    // Mark current lesson as completed
    if (!completedLessons.includes(currentLesson)) {
        completedLessons.push(currentLesson);
        saveProgress();
    }
    
    if (currentLesson < totalLessons) {
        switchToLesson(currentLesson + 1);
    } else {
        // Course completed - redirect to main page
        showNotification('🎉 Chúc mừng! Bạn đã hoàn thành khóa học này!', 'success');
        trackEvent('course_completed', {
            course: window.location.pathname.split('/').pop().replace('.html', ''),
            completion_time: Date.now()
        });
        
        // Redirect to main page after 2 seconds
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
    }
    
    updateProgress();
}

function prevLesson() {
    if (currentLesson > 1) {
        switchToLesson(currentLesson - 1);
    }
}

function updateProgress() {
    const progressPercentage = (completedLessons.length / totalLessons) * 100;
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${completedLessons.length}/${totalLessons} bài học hoàn thành`;
    }
}

function saveProgress() {
    const progressData = {
        currentLesson: currentLesson,
        completedLessons: completedLessons,
        lastAccessed: Date.now()
    };
    
    localStorage.setItem('budgeting_course_progress', JSON.stringify(progressData));
}

function loadProgress() {
    const savedProgress = localStorage.getItem('budgeting_course_progress');
    if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        currentLesson = progressData.currentLesson || 1;
        completedLessons = progressData.completedLessons || [];
        
        updateProgress();
        updateSidebar();
        updateNavigationButtons();
    }
}

// Quiz functionality
function checkAnswer(questionId, correctAnswer) {
    const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
    const feedback = document.getElementById(`${questionId}-feedback`);
    
    if (!selectedAnswer) {
        showNotification('Vui lòng chọn một đáp án!', 'info');
        return;
    }
    
    const isCorrect = selectedAnswer.value === correctAnswer;
    
    feedback.classList.remove('correct', 'incorrect');
    
    if (isCorrect) {
        feedback.classList.add('correct');
        feedback.innerHTML = '✅ Chính xác! Giảm căng thẳng và có mục tiêu chung là lợi ích lớn nhất của ngân sách đối với cặp đôi.';
    } else {
        feedback.classList.add('incorrect');
        feedback.innerHTML = '❌ Chưa đúng. Mặc dù tiết kiệm tiền và theo dõi chi tiêu quan trọng, nhưng lợi ích lớn nhất là giúp cặp đôi giảm căng thẳng và có cùng mục tiêu.';
    }
    
    // Track quiz interaction
    trackEvent('quiz_answer', {
        question_id: questionId,
        selected_answer: selectedAnswer.value,
        correct_answer: correctAnswer,
        is_correct: isCorrect,
        course: 'budgeting'
    });
}

// 50/30/20 Calculator
function calculate50_30_20() {
    const incomeInput = document.getElementById('monthly-income');
    const resultsDiv = document.getElementById('calculation-results');
    
    if (!incomeInput || !incomeInput.value) {
        showNotification('Vui lòng nhập thu nhập hàng tháng!', 'error');
        return;
    }
    
    const income = parseFloat(incomeInput.value);
    
    if (income <= 0) {
        showNotification('Thu nhập phải lớn hơn 0!', 'error');
        return;
    }
    
    const essential = income * 0.5;
    const flexible = income * 0.3;
    const savings = income * 0.2;
    
    // Update results
    document.getElementById('essential-amount').textContent = formatVND(essential);
    document.getElementById('flexible-amount').textContent = formatVND(flexible);
    document.getElementById('savings-amount').textContent = formatVND(savings);
    
    // Show results
    resultsDiv.style.display = 'grid';
    
    // Track calculator usage
    trackEvent('calculator_used', {
        calculator_type: '50_30_20',
        income_amount: income,
        course: 'budgeting'
    });
    
    showNotification('Đã tính toán thành công! Hãy so sánh với chi tiêu hiện tại của bạn.', 'success');
}

// Interactive budget planner
function createBudgetPlanner() {
    const plannerHtml = `
        <div class="budget-planner">
            <h3>🗂️ Bảng Lập Ngân Sách Cá Nhân</h3>
            <div class="planner-sections">
                <div class="income-section">
                    <h4>Thu Nhập</h4>
                    <div class="input-row">
                        <label>Lương chính:</label>
                        <input type="number" id="main-salary" placeholder="VNĐ">
                    </div>
                    <div class="input-row">
                        <label>Thu nhập phụ:</label>
                        <input type="number" id="side-income" placeholder="VNĐ">
                    </div>
                    <div class="total-row">
                        <strong>Tổng thu nhập: <span id="total-income">0 VNĐ</span></strong>
                    </div>
                </div>
                
                <div class="expenses-section">
                    <h4>Chi Phí Thiết Yếu (50%)</h4>
                    <div class="input-row">
                        <label>Nhà ở:</label>
                        <input type="number" class="essential-expense" placeholder="VNĐ">
                    </div>
                    <div class="input-row">
                        <label>Thực phẩm:</label>
                        <input type="number" class="essential-expense" placeholder="VNĐ">
                    </div>
                    <div class="input-row">
                        <label>Giao thông:</label>
                        <input type="number" class="essential-expense" placeholder="VNĐ">
                    </div>
                    <div class="input-row">
                        <label>Điện nước:</label>
                        <input type="number" class="essential-expense" placeholder="VNĐ">
                    </div>
                    <div class="total-row">
                        <strong>Tổng thiết yếu: <span id="total-essential">0 VNĐ</span></strong>
                    </div>
                </div>
                
                <div class="flexible-section">
                    <h4>Chi Phí Linh Hoạt (30%)</h4>
                    <div class="input-row">
                        <label>Ăn uống ngoài:</label>
                        <input type="number" class="flexible-expense" placeholder="VNĐ">
                    </div>
                    <div class="input-row">
                        <label>Giải trí:</label>
                        <input type="number" class="flexible-expense" placeholder="VNĐ">
                    </div>
                    <div class="input-row">
                        <label>Mua sắm:</label>
                        <input type="number" class="flexible-expense" placeholder="VNĐ">
                    </div>
                    <div class="total-row">
                        <strong>Tổng linh hoạt: <span id="total-flexible">0 VNĐ</span></strong>
                    </div>
                </div>
                
                <div class="savings-section">
                    <h4>Tiết Kiệm & Đầu Tư (20%)</h4>
                    <div class="input-row">
                        <label>Quỹ khẩn cấp:</label>
                        <input type="number" class="savings-amount" placeholder="VNĐ">
                    </div>
                    <div class="input-row">
                        <label>Đầu tư:</label>
                        <input type="number" class="savings-amount" placeholder="VNĐ">
                    </div>
                    <div class="input-row">
                        <label>Mục tiêu dài hạn:</label>
                        <input type="number" class="savings-amount" placeholder="VNĐ">
                    </div>
                    <div class="total-row">
                        <strong>Tổng tiết kiệm: <span id="total-savings">0 VNĐ</span></strong>
                    </div>
                </div>
            </div>
            
            <div class="budget-summary">
                <h4>📊 Tóm Tắt Ngân Sách</h4>
                <div class="summary-grid">
                    <div class="summary-item">
                        <span>Thu nhập:</span>
                        <span id="summary-income">0 VNĐ</span>
                    </div>
                    <div class="summary-item">
                        <span>Chi tiêu:</span>
                        <span id="summary-expenses">0 VNĐ</span>
                    </div>
                    <div class="summary-item balance">
                        <span>Số dư:</span>
                        <span id="summary-balance">0 VNĐ</span>
                    </div>
                </div>
                <div class="budget-status" id="budget-status"></div>
            </div>
            
            <button onclick="saveBudgetPlan()" class="save-budget-btn">💾 Lưu Ngân Sách</button>
        </div>
    `;
    
    return plannerHtml;
}

function updateBudgetCalculations() {
    // Calculate totals
    const mainSalary = parseFloat(document.getElementById('main-salary')?.value || 0);
    const sideIncome = parseFloat(document.getElementById('side-income')?.value || 0);
    const totalIncome = mainSalary + sideIncome;
    
    let totalEssential = 0;
    document.querySelectorAll('.essential-expense').forEach(input => {
        totalEssential += parseFloat(input.value || 0);
    });
    
    let totalFlexible = 0;
    document.querySelectorAll('.flexible-expense').forEach(input => {
        totalFlexible += parseFloat(input.value || 0);
    });
    
    let totalSavings = 0;
    document.querySelectorAll('.savings-amount').forEach(input => {
        totalSavings += parseFloat(input.value || 0);
    });
    
    const totalExpenses = totalEssential + totalFlexible + totalSavings;
    const balance = totalIncome - totalExpenses;
    
    // Update display
    document.getElementById('total-income').textContent = formatVND(totalIncome);
    document.getElementById('total-essential').textContent = formatVND(totalEssential);
    document.getElementById('total-flexible').textContent = formatVND(totalFlexible);
    document.getElementById('total-savings').textContent = formatVND(totalSavings);
    
    document.getElementById('summary-income').textContent = formatVND(totalIncome);
    document.getElementById('summary-expenses').textContent = formatVND(totalExpenses);
    document.getElementById('summary-balance').textContent = formatVND(balance);
    
    // Update status
    const statusElement = document.getElementById('budget-status');
    const balanceElement = document.querySelector('.balance span:last-child');
    
    if (balance > 0) {
        statusElement.innerHTML = '✅ Ngân sách cân bằng tốt!';
        statusElement.className = 'budget-status positive';
        balanceElement.style.color = '#10b981';
    } else if (balance === 0) {
        statusElement.innerHTML = '⚖️ Ngân sách cân bằng hoàn hảo!';
        statusElement.className = 'budget-status neutral';
        balanceElement.style.color = '#64748b';
    } else {
        statusElement.innerHTML = '⚠️ Chi tiêu vượt quá thu nhập!';
        statusElement.className = 'budget-status negative';
        balanceElement.style.color = '#ef4444';
    }
}

function saveBudgetPlan() {
    const budgetData = {
        income: {
            main: document.getElementById('main-salary')?.value || 0,
            side: document.getElementById('side-income')?.value || 0
        },
        essential: Array.from(document.querySelectorAll('.essential-expense')).map(input => input.value || 0),
        flexible: Array.from(document.querySelectorAll('.flexible-expense')).map(input => input.value || 0),
        savings: Array.from(document.querySelectorAll('.savings-amount')).map(input => input.value || 0),
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('personal_budget_plan', JSON.stringify(budgetData));
    showNotification('Đã lưu ngân sách thành công! Bạn có thể quay lại xem bất cứ lúc nào.', 'success');
    
    trackEvent('budget_saved', {
        total_income: budgetData.income.main + budgetData.income.side,
        course: 'budgeting'
    });
}

// Add event listeners for budget planner if it exists
document.addEventListener('DOMContentLoaded', function() {
    // Add planner to lesson 2 if not exists
    if (currentLesson === 2) {
        const lesson2 = document.getElementById('lesson-2');
        if (lesson2 && !lesson2.querySelector('.budget-planner')) {
            const plannerSection = document.createElement('div');
            plannerSection.className = 'content-section';
            plannerSection.innerHTML = `
                <h3>📊 Thực Hành Lập Ngân Sách</h3>
                ${createBudgetPlanner()}
            `;
            
            // Insert before action section
            const actionSection = lesson2.querySelector('.action-section');
            if (actionSection) {
                lesson2.insertBefore(plannerSection, actionSection);
            }
        }
    }
    
    // Add event listeners for budget inputs
    document.addEventListener('input', function(e) {
        if (e.target.matches('#main-salary, #side-income, .essential-expense, .flexible-expense, .savings-amount')) {
            updateBudgetCalculations();
        }
    });
});

// Export functions for use in HTML
window.nextLesson = nextLesson;
window.prevLesson = prevLesson;
window.checkAnswer = checkAnswer;
window.calculate50_30_20 = calculate50_30_20;
window.saveBudgetPlan = saveBudgetPlan;