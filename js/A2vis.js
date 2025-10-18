// Simple Data Visualizations using SVG
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

    // Convert to chart format
    const labels = Object.keys(taylorSwiftCounts).sort((a, b) => parseInt(a) - parseInt(b));
    const counts = labels.map(label => taylorSwiftCounts[label]);

    // SVG dimensions
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    container.appendChild(svg);

    // Colors array
    const colors = ['#FFFFFF', '#FFF4E6', '#FFE0B3', '#FFCC80', '#FFB74D', '#FF9800', '#F57C00', '#E65100', '#D84315'];

    // Calculate scales
    const maxCount = Math.max(...counts);
    const barWidth = chartWidth / labels.length;
    const scaleY = chartHeight / maxCount;

    // Create bars
    labels.forEach((label, index) => {
        const barHeight = counts[index] * scaleY;
        const x = margin.left + index * barWidth;
        const y = margin.top + chartHeight - barHeight;

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barWidth - 2);
        rect.setAttribute('height', barHeight);
        rect.setAttribute('fill', colors[index] || '#FF9800');
        rect.setAttribute('stroke', '#333');
        rect.setAttribute('stroke-width', '1');
        svg.appendChild(rect);

        // Add labels
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x + barWidth / 2);
        text.setAttribute('y', height - margin.bottom + 15);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '12');
        text.setAttribute('fill', '#CCCCCC');
        text.textContent = label;
        svg.appendChild(text);
    });

    // Add Y-axis labels
    for (let i = 0; i <= maxCount; i++) {
        const y = margin.top + chartHeight - (i * scaleY);
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', margin.left - 10);
        text.setAttribute('y', y + 4);
        text.setAttribute('text-anchor', 'end');
        text.setAttribute('font-size', '12');
        text.setAttribute('fill', '#CCCCCC');
        text.textContent = i;
        svg.appendChild(text);
    }

    // Add title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', width / 2);
    title.setAttribute('y', 15);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-size', '16');
    title.setAttribute('font-weight', 'bold');
    title.setAttribute('fill', '#FFFFFF');
    title.textContent = 'Taylor Swift Hate Level Distribution';
    svg.appendChild(title);

    // Add axis labels
    const yAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yAxisLabel.setAttribute('x', 15);
    yAxisLabel.setAttribute('y', height / 2);
    yAxisLabel.setAttribute('text-anchor', 'middle');
    yAxisLabel.setAttribute('font-size', '14');
    yAxisLabel.setAttribute('transform', `rotate(-90, 15, ${height / 2})`);
    yAxisLabel.setAttribute('fill', '#DDDDDD');
    yAxisLabel.textContent = 'Count';
    svg.appendChild(yAxisLabel);

    const xAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xAxisLabel.setAttribute('x', width / 2);
    xAxisLabel.setAttribute('y', height - 10);
    xAxisLabel.setAttribute('text-anchor', 'middle');
    xAxisLabel.setAttribute('font-size', '14');
    xAxisLabel.setAttribute('fill', '#DDDDDD');
    xAxisLabel.textContent = 'Taylor Swift Hate Level';
    svg.appendChild(xAxisLabel);
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

    // SVG dimensions
    const width = 800;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 80, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    container.appendChild(svg);

    // Calculate scales
    const xScale = chartWidth / uniqueDinners.length;
    const yScale = chartHeight / 10;

    // Create scatter points
    scatterData.forEach((point, index) => {
        const cx = margin.left + (point.x + 0.5) * xScale;
        const cy = margin.top + chartHeight - (point.y * yScale);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', point.pointRadius);
        circle.setAttribute('fill', `rgba(255, 152, 0, ${point.alpha})`);
        circle.setAttribute('stroke', 'rgba(255, 152, 0, 1)');
        circle.setAttribute('stroke-width', '1');
        
        // Add tooltip data
        circle.setAttribute('data-dinner', point.dinner);
        circle.setAttribute('data-tiredness', point.y);
        
        // Add hover effect
        circle.addEventListener('mouseenter', function() {
            circle.setAttribute('stroke-width', '2');
        });
        circle.addEventListener('mouseleave', function() {
            circle.setAttribute('stroke-width', '1');
        });
        
        svg.appendChild(circle);
    });

    // Add X-axis labels
    uniqueDinners.forEach((dinner, index) => {
        const x = margin.left + (index + 0.5) * xScale;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', height - margin.bottom + 15);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '10');
        text.setAttribute('transform', `rotate(45, ${x}, ${height - margin.bottom + 15})`);
        text.setAttribute('fill', '#CCCCCC');
        text.textContent = dinner;
        svg.appendChild(text);
    });

    // Add Y-axis labels
    for (let i = 0; i <= 10; i++) {
        const y = margin.top + chartHeight - (i * yScale);
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', margin.left - 10);
        text.setAttribute('y', y + 4);
        text.setAttribute('text-anchor', 'end');
        text.setAttribute('font-size', '12');
        text.setAttribute('fill', '#CCCCCC');
        text.textContent = i;
        svg.appendChild(text);
    }

    // Add title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', width / 2);
    title.setAttribute('y', 15);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-size', '16');
    title.setAttribute('font-weight', 'bold');
    title.setAttribute('fill', '#FFFFFF');
    title.textContent = 'Tiredness Level vs Dinner Response (Point size & color intensity = Tiredness Level)';
    svg.appendChild(title);

    // Add axis labels
    const yAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yAxisLabel.setAttribute('x', 15);
    yAxisLabel.setAttribute('y', height / 2);
    yAxisLabel.setAttribute('text-anchor', 'middle');
    yAxisLabel.setAttribute('font-size', '14');
    yAxisLabel.setAttribute('transform', `rotate(-90, 15, ${height / 2})`);
    yAxisLabel.setAttribute('fill', '#DDDDDD');
    yAxisLabel.textContent = 'Tiredness Level';
    svg.appendChild(yAxisLabel);

    const xAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xAxisLabel.setAttribute('x', width / 2);
    xAxisLabel.setAttribute('y', height - 20);
    xAxisLabel.setAttribute('text-anchor', 'middle');
    xAxisLabel.setAttribute('font-size', '14');
    xAxisLabel.setAttribute('fill', '#DDDDDD');
    xAxisLabel.textContent = 'Dinner Response';
    svg.appendChild(xAxisLabel);
}