// Compound Interest Calculator JavaScript
let calculationData = [];
let chart;

document.addEventListener('DOMContentLoaded', function() {
    // Add input formatters
    setupInputFormatters();
    
    // Add real-time calculation on input change
    setupRealTimeCalculation();
    
    // Load saved data if exists
    loadSavedData();
});

function setupInputFormatters() {
    // Format number inputs with thousand separators
    const numberInputs = ['initial-amount', 'monthly-contribution'];
    
    numberInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                formatNumberInput(this);
            });
            
            input.addEventListener('blur', function() {
                formatNumberInput(this, true);
            });
        }
    });
}

function formatNumberInput(input, blur = false) {
    let value = input.value.replace(/[^\d]/g, '');
    
    if (value && blur) {
        // Format with thousand separators on blur
        input.value = parseInt(value).toLocaleString('vi-VN');
    } else {
        input.value = value;
    }
}

function setupRealTimeCalculation() {
    const inputs = ['initial-amount', 'monthly-contribution', 'annual-rate', 'investment-years', 'compound-frequency'];
    
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', debounce(calculateCompound, 500));
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function calculateCompound() {
    // Get input values
    const initialAmount = parseFloat(document.getElementById('initial-amount').value.replace(/[^\d]/g, '') || 0);
    const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value.replace(/[^\d]/g, '') || 0);
    const annualRate = parseFloat(document.getElementById('annual-rate').value || 0) / 100;
    const years = parseInt(document.getElementById('investment-years').value || 0);
    const compoundFrequency = parseInt(document.getElementById('compound-frequency').value || 12);
    
    // Validate inputs
    if (years <= 0) {
        hideResults();
        return;
    }
    
    if (initialAmount <= 0 && monthlyContribution <= 0) {
        showNotification('Vui lòng nhập số tiền ban đầu hoặc đóng góp hàng tháng!', 'error');
        hideResults();
        return;
    }
    
    if (annualRate < 0 || annualRate > 1) {
        showNotification('Lãi suất phải trong khoảng 0-100%!', 'error');
        hideResults();
        return;
    }
    
    // Calculate compound interest
    calculationData = [];
    let totalContributions = initialAmount;
    let currentAmount = initialAmount;
    
    for (let year = 1; year <= years; year++) {
        const yearlyContribution = monthlyContribution * 12;
        const startAmount = currentAmount;
        
        // Calculate monthly compound interest
        for (let month = 1; month <= 12; month++) {
            // Add monthly contribution at the beginning of month
            currentAmount += monthlyContribution;
            
            // Apply monthly interest
            const monthlyRate = annualRate / compoundFrequency;
            currentAmount *= (1 + monthlyRate);
        }
        
        totalContributions += yearlyContribution;
        const yearInterest = currentAmount - startAmount - yearlyContribution;
        
        calculationData.push({
            year: year,
            yearlyContribution: yearlyContribution,
            yearInterest: yearInterest,
            totalContributions: totalContributions,
            totalAmount: currentAmount
        });
    }
    
    const finalAmount = currentAmount;
    const totalInterest = finalAmount - totalContributions;
    const interestRatio = ((totalInterest / totalContributions) * 100);
    
    // Display results
    displayResults(finalAmount, totalContributions, totalInterest, interestRatio);
    
    // Create chart
    createGrowthChart();
    
    // Create breakdown table
    createBreakdownTable();
    
    // Show results section
    document.getElementById('results-section').style.display = 'block';
    
    // Save calculation data
    saveCalculationData();
    
    // Track calculation
    trackEvent('compound_calculation', {
        initial_amount: initialAmount,
        monthly_contribution: monthlyContribution,
        annual_rate: annualRate * 100,
        years: years,
        final_amount: finalAmount
    });
}

function displayResults(finalAmount, totalContributions, totalInterest, interestRatio) {
    document.getElementById('final-amount').textContent = formatVND(finalAmount);
    document.getElementById('total-contributions').textContent = formatVND(totalContributions);
    document.getElementById('total-interest').textContent = formatVND(totalInterest);
    document.getElementById('interest-ratio').textContent = interestRatio.toFixed(1) + '%';
}

function createGrowthChart() {
    const ctx = document.getElementById('growthChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (chart) {
        chart.destroy();
    }
    
    const labels = calculationData.map(item => `Năm ${item.year}`);
    const contributionsData = calculationData.map(item => item.totalContributions);
    const totalAmountData = calculationData.map(item => item.totalAmount);
    const interestData = calculationData.map(item => item.totalAmount - item.totalContributions);
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Vốn đóng góp',
                    data: contributionsData,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Tổng giá trị',
                    data: totalAmountData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Biểu đồ tăng trưởng đầu tư theo thời gian',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false // Using custom legend
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatVNDShort(value);
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            tooltips: {
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + formatVND(context.raw);
                    }
                }
            }
        }
    });
}

function createBreakdownTable() {
    const tbody = document.getElementById('breakdown-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    calculationData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>Năm ${item.year}</strong></td>
            <td>${formatVND(item.yearlyContribution)}</td>
            <td>${formatVND(item.yearInterest)}</td>
            <td>${formatVND(item.totalContributions)}</td>
            <td><strong>${formatVND(item.totalAmount)}</strong></td>
        `;
        tbody.appendChild(row);
    });
}

function toggleBreakdown() {
    const table = document.getElementById('breakdown-table');
    const button = document.getElementById('breakdown-toggle');
    
    if (table.style.display === 'none' || !table.style.display) {
        table.style.display = 'block';
        button.textContent = 'Ẩn Chi Tiết';
    } else {
        table.style.display = 'none';
        button.textContent = 'Hiển Thị Chi Tiết';
    }
}

function exportToCSV() {
    if (calculationData.length === 0) {
        showNotification('Chưa có dữ liệu để xuất!', 'error');
        return;
    }
    
    let csv = 'Năm,Đóng Góp Trong Năm,Lãi Trong Năm,Tổng Vốn Gốc,Tổng Giá Trị\n';
    
    calculationData.forEach(item => {
        csv += `${item.year},${item.yearlyContribution},${item.yearInterest.toFixed(0)},${item.totalContributions.toFixed(0)},${item.totalAmount.toFixed(0)}\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `lai_kep_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Đã xuất file Excel thành công!', 'success');
    
    trackEvent('export_csv', {
        data_points: calculationData.length,
        tool: 'compound_calculator'
    });
}

function clearCalculator() {
    // Clear all inputs
    document.getElementById('initial-amount').value = '';
    document.getElementById('monthly-contribution').value = '';
    document.getElementById('annual-rate').value = '';
    document.getElementById('investment-years').value = '';
    document.getElementById('compound-frequency').value = '12';
    
    // Hide results
    hideResults();
    
    // Clear saved data
    localStorage.removeItem('compound_calculator_data');
    
    showNotification('Đã xóa tất cả dữ liệu!', 'info');
}

function hideResults() {
    document.getElementById('results-section').style.display = 'none';
    
    // Destroy chart if exists
    if (chart) {
        chart.destroy();
        chart = null;
    }
    
    calculationData = [];
}

function loadExampleData() {
    document.getElementById('initial-amount').value = '50000000';
    document.getElementById('monthly-contribution').value = '3000000';
    document.getElementById('annual-rate').value = '10';
    document.getElementById('investment-years').value = '25';
    document.getElementById('compound-frequency').value = '12';
    
    // Calculate with example data
    calculateCompound();
    
    showNotification('Đã áp dụng ví dụ thực tế! Hãy xem kết quả bên dưới.', 'success');
    
    trackEvent('example_loaded', {
        tool: 'compound_calculator'
    });
}

function saveCalculationData() {
    const data = {
        initialAmount: document.getElementById('initial-amount').value,
        monthlyContribution: document.getElementById('monthly-contribution').value,
        annualRate: document.getElementById('annual-rate').value,
        investmentYears: document.getElementById('investment-years').value,
        compoundFrequency: document.getElementById('compound-frequency').value,
        calculationData: calculationData,
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('compound_calculator_data', JSON.stringify(data));
}

function loadSavedData() {
    const savedData = localStorage.getItem('compound_calculator_data');
    if (!savedData) return;
    
    try {
        const data = JSON.parse(savedData);
        
        // Check if data is recent (within 7 days)
        const savedDate = new Date(data.savedAt);
        const now = new Date();
        const daysDiff = (now - savedDate) / (1000 * 60 * 60 * 24);
        
        if (daysDiff > 7) {
            localStorage.removeItem('compound_calculator_data');
            return;
        }
        
        // Load saved inputs
        if (data.initialAmount) document.getElementById('initial-amount').value = data.initialAmount;
        if (data.monthlyContribution) document.getElementById('monthly-contribution').value = data.monthlyContribution;
        if (data.annualRate) document.getElementById('annual-rate').value = data.annualRate;
        if (data.investmentYears) document.getElementById('investment-years').value = data.investmentYears;
        if (data.compoundFrequency) document.getElementById('compound-frequency').value = data.compoundFrequency;
        
        // Recalculate if all required data exists
        if (data.initialAmount && data.investmentYears) {
            calculateCompound();
        }
        
    } catch (error) {
        console.error('Error loading saved data:', error);
        localStorage.removeItem('compound_calculator_data');
    }
}

// Utility functions
function formatVNDShort(amount) {
    if (amount >= 1000000000) {
        return (amount / 1000000000).toFixed(1) + ' tỷ';
    } else if (amount >= 1000000) {
        return (amount / 1000000).toFixed(1) + ' tr';
    } else if (amount >= 1000) {
        return (amount / 1000).toFixed(0) + 'k';
    }
    return amount.toFixed(0);
}

// Add input validation
document.addEventListener('DOMContentLoaded', function() {
    // Prevent negative values
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
    
    // Limit percentage inputs
    const percentInputs = ['annual-rate'];
    percentInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                if (parseFloat(this.value) > 100) {
                    this.value = 100;
                }
            });
        }
    });
});

// Export functions for HTML onclick events
window.calculateCompound = calculateCompound;
window.clearCalculator = clearCalculator;
window.toggleBreakdown = toggleBreakdown;
window.exportToCSV = exportToCSV;
window.loadExampleData = loadExampleData;