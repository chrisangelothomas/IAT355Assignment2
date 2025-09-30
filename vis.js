// Simple Data Visualizations using Chart.js
document.addEventListener('DOMContentLoaded', function() {
    // Survey data
    const data = [
        { 'Taylor Swift haters': '2', 'Dinner response': 'Steak', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '5', 'Dinner response': 'Steak', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '7', 'Dinner response': 'Noodles', 'Tiredness rating': '5' },
        { 'Taylor Swift haters': '4', 'Dinner response': 'Pasta', 'Tiredness rating': '6' },
        { 'Taylor Swift haters': '1', 'Dinner response': 'Shawarma', 'Tiredness rating': '6' },
        { 'Taylor Swift haters': '2', 'Dinner response': 'Pasta', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '6', 'Dinner response': 'Steak', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '2', 'Dinner response': 'Biryani', 'Tiredness rating': '2' },
        { 'Taylor Swift haters': '4', 'Dinner response': 'Dumpling', 'Tiredness rating': '7' },
        { 'Taylor Swift haters': '5', 'Dinner response': 'Chicken Curry', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '3', 'Dinner response': 'Biryani', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '3', 'Dinner response': 'Lasagna', 'Tiredness rating': '7' },
        { 'Taylor Swift haters': '3', 'Dinner response': 'Steak', 'Tiredness rating': '7' },
        { 'Taylor Swift haters': '6', 'Dinner response': 'Shawarma', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '2', 'Dinner response': 'Ramen', 'Tiredness rating': '3' },
        { 'Taylor Swift haters': '3', 'Dinner response': 'Sashimi', 'Tiredness rating': '5' },
        { 'Taylor Swift haters': '7', 'Dinner response': 'Fried Chicken', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '7', 'Dinner response': 'Steak', 'Tiredness rating': '6' },
        { 'Taylor Swift haters': '9', 'Dinner response': 'Buffalo Wings', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '4', 'Dinner response': 'Pasta', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '4', 'Dinner response': 'Pasta', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '7', 'Dinner response': 'Lasagna', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '6', 'Dinner response': 'Lasagna', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '7', 'Dinner response': 'Sushi', 'Tiredness rating': '7' },
        { 'Taylor Swift haters': '4', 'Dinner response': 'Ramen', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '6', 'Dinner response': 'Noodles', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '8', 'Dinner response': 'Fried Chicken', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '2', 'Dinner response': 'Pizza', 'Tiredness rating': '6' },
        { 'Taylor Swift haters': '5', 'Dinner response': 'Steak', 'Tiredness rating': '5' },
        { 'Taylor Swift haters': '6', 'Dinner response': 'Ramen', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '5', 'Dinner response': 'Sushi', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '5', 'Dinner response': 'Sushi', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '5', 'Dinner response': 'Ramen', 'Tiredness rating': '6' },
        { 'Taylor Swift haters': '9', 'Dinner response': 'Pasta', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '5', 'Dinner response': 'Fried Chicken', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '5', 'Dinner response': 'Shawarma', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '6', 'Dinner response': 'Fried Rice', 'Tiredness rating': '8' },
        { 'Taylor Swift haters': '1', 'Dinner response': 'Shawarma', 'Tiredness rating': '5' },
        { 'Taylor Swift haters': '3', 'Dinner response': 'Fried Chicken', 'Tiredness rating': '4' },
        { 'Taylor Swift haters': '3', 'Dinner response': 'Shawarma', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '2', 'Dinner response': 'Samosa', 'Tiredness rating': '9' },
        { 'Taylor Swift haters': '6', 'Dinner response': 'Steak', 'Tiredness rating': '3' }
    ];
    
    // Create visualizations
    createBarChart(data);
    createScatterChart(data);
});

function createBarChart(data) {
    const container = document.getElementById('bar-chart');
    if (!container) return;

    // Count Taylor Swift haters
    const taylorSwiftCounts = {};
    data.forEach(row => {
        const value = row['Taylor Swift haters'];
        if (value) {
            taylorSwiftCounts[value] = (taylorSwiftCounts[value] || 0) + 1;
        }
    });

    // Convert to Chart.js format
    const labels = Object.keys(taylorSwiftCounts).sort((a, b) => parseInt(a) - parseInt(b));
    const counts = labels.map(label => taylorSwiftCounts[label]);

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'taylorSwiftChart';
    canvas.width = 600;
    canvas.height = 300;
    container.appendChild(canvas);

    // Create chart
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Count',
                data: counts,
                backgroundColor: [
                    '#FFFFFF', '#FFF4E6', '#FFE0B3', '#FFCC80', 
                    '#FFB74D', '#FF9800', '#F57C00', '#E65100', '#D84315'
                ],
                borderColor: '#333',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Taylor Swift Hate Level Distribution'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Count'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Taylor Swift Hate Level'
                    }
                }
            }
        }
    });
}

function createScatterChart(data) {
    const container = document.getElementById('circle-chart');
    if (!container) return;

    // Get unique dinner responses for x-axis labels
    const uniqueDinners = [...new Set(data.map(row => row['Dinner response']))];
    
    // Prepare data for scatter plot - x is dinner (categorical), y is tiredness
    // Add jitter to x positions to spread points and make them more visible
    const scatterData = data.map(row => {
        const tiredness = parseInt(row['Tiredness rating']);
        const dinner = row['Dinner response'];
        
        // Map dinner to x position (index in uniqueDinners array)
        const baseX = uniqueDinners.indexOf(dinner);
        
        // Add small random jitter to x position to spread overlapping points
        const jitter = (Math.random() - 0.5) * 0.3;
        const x = baseX + jitter;
        
        // Point size based on tiredness level (4-12 radius range)
        const pointRadius = 4 + (tiredness * 0.8);
        
        // Color saturation based on tiredness level (0.3-1.0 alpha range)
        const alpha = 0.3 + (tiredness * 0.07);
        
        return {
            x: x,
            y: tiredness,
            dinner: dinner,
            pointRadius: pointRadius,
            alpha: alpha
        };
    });

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'scatterChart';
    canvas.width = 800;
    canvas.height = 500;
    container.appendChild(canvas);

    // Create chart
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Survey Responses',
                data: scatterData,
                backgroundColor: scatterData.map(point => `rgba(255, 152, 0, ${point.alpha})`),
                borderColor: scatterData.map(point => `rgba(255, 152, 0, 1)`),
                borderWidth: 1,
                pointRadius: scatterData.map(point => point.pointRadius)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Tiredness Level vs Dinner Response (Point size & color intensity = Tiredness Level)'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = scatterData[context.dataIndex];
                            return [
                                `Dinner: ${point.dinner}`,
                                `Tiredness: ${point.y}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Dinner Response'
                    },
                    type: 'linear',
                    min: -0.5,
                    max: uniqueDinners.length - 0.5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            const index = Math.round(value);
                            return uniqueDinners[index] || '';
                        },
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tiredness Level'
                    },
                    min: 0,
                    max: 10,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}