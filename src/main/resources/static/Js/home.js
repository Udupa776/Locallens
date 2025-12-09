let issues = [
    {
        id: 1,
        user: 'Rajesh Kumar',
        avatar: '👤',
        category: 'pothole',
        title: 'Large pothole on MG Road causing accidents',
        description: 'Dangerous pothole near the traffic signal. Multiple vehicles damaged in the last week.',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
        location: 'MG Road, Bangalore',
        status: 'reported',
        likes: 45,
        comments: 12,
        upvotes: 32,
        timestamp: '2 hours ago',
        urgency: 'high',
        assignedTo: 'Public Works Department',
        assignedBy: 'Admin'
    },
    {
        id: 2,
        user: 'Priya Sharma',
        avatar: '👩',
        category: 'garbage',
        title: 'Overflowing garbage dump near park',
        description: 'Garbage not collected for 5 days. Creating health hazards for nearby residents.',
        image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&h=400&fit=crop',
        location: 'Koramangala 5th Block',
        status: 'progress',
        likes: 78,
        comments: 23,
        upvotes: 56,
        timestamp: '5 hours ago',
        urgency: 'high',
        assignedTo: 'Solid Waste Management',
        assignedBy: 'Admin'
    },
    {
        id: 3,
        user: 'Anil Reddy',
        avatar: '👨',
        category: 'water',
        title: 'Water leak on main street',
        description: 'Continuous water leakage for the past 3 days. Water being wasted.',
        image: 'https://images.unsplash.com/photo-1584552537010-6d22e4a50535?w=600&h=400&fit=crop',
        location: 'Indiranagar 100ft Road',
        status: 'resolved',
        likes: 34,
        comments: 8,
        upvotes: 28,
        timestamp: '1 day ago',
        urgency: 'medium',
        assignedTo: 'Water Supply Department',
        assignedBy: 'Admin'
    },
    {
        id: 4,
        user: 'Sneha Patel',
        avatar: '👩‍💼',
        category: 'stray',
        title: 'Pack of stray dogs causing disturbance',
        description: 'Group of aggressive stray dogs near school area. Safety concern for children.',
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=400&fit=crop',
        location: 'Jayanagar 4th Block',
        status: 'reported',
        likes: 56,
        comments: 15,
        upvotes: 41,
        timestamp: '3 hours ago',
        urgency: 'high',
        assignedTo: null,
        assignedBy: null
    }
];

let likedIssues = new Set();
let upvotedIssues = new Set();
let currentFilter = 'all';

// Render Issues
async function renderIssues() {
    let res=await fetch("http://localhost:8080/feed")
    let data=await res.json()
    console.log(data)
    const feed = document.getElementById('issuesFeed');
    const noResults = document.getElementById('noResults');

    const filteredIssues = currentFilter === 'all'
        ? issues
        : issues.filter(issue => issue.category === currentFilter);

    if (filteredIssues.length === 0) {
        feed.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }


    noResults.style.display = 'none';

    feed.innerHTML = data.map(issue => `
                <div class="issue-card">
                    <div class="card-header">
                        <div class="user-info">
                            <div class="user-details">
                                <div class="avatar">${issue.avatar}</div>
                                <div>
                                    <div class="username">${issue.user}</div>
                                    <div class="timestamp">${issue.timestamp}</div>
                                </div>
                            </div>
                            <span class="status-badge status-${issue.status}">
                                ${getStatusText(issue.status)}
                            </span>
                        </div>
                        
                        <h2 class="issue-title">${issue.title}</h2>
                        <p class="issue-description">${issue.description}</p>
                        
                        <div class="location-info">
                            <span class="location-icon">📍</span>
                            <span>${issue.location}</span>
                            <span>•</span>
                            <span class="distance">${issue.distance}</span>
                        </div>

                        ${issue.urgency === 'high' ? `
                            <div class="urgency-high">
                                ⚠ High Priority Issue
                            </div>
                        ` : ''}

                        <div class="upvote-section">
                            <button class="upvote-btn ${upvotedIssues.has(issue.id) ? 'upvoted' : ''}" 
                                    onclick="toggleUpvote(${issue.id})">
                                <span>👍</span>
                                <span>${issue.upvotes + (upvotedIssues.has(issue.id) ? 1 : 0)} Upvotes</span>
                            </button>
                            <span style="font-size: 12px; color: #666;">Help prioritize this issue</span>
                        </div>
                    </div>
                    
                    <img src="${issue.image}" alt="${issue.title}" class="issue-image">
                    
                    <div class="card-footer">
                        <div class="engagement-stats">
                            <span>${issue.likes + (likedIssues.has(issue.id) ? 1 : 0)} people care about this</span>
                            <span>${issue.comments} comments</span>
                        </div>
                        <div class="action-buttons">
                            <button class="action-btn ${likedIssues.has(issue.id) ? 'liked' : ''}" 
                                    onclick="toggleLike(${issue.id})">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${likedIssues.has(issue.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                Care
                            </button>
                            
                            <button class="action-btn" onclick="commentIssue(${issue.id})">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                Comment
                            </button>
                            
                            <button class="action-btn" onclick="shareIssue(${issue.id})">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
}

function getStatusText(status) {
    const statusMap = {
        'reported': 'Reported',
        'progress': 'In Progress',
        'resolved': 'Resolved'
    };
    return statusMap[status] || status;
}

// Filter Issues
function filterCategory(category) {
    currentFilter = category;

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelector([data-category=="${category}"]).classList.add('active');

    renderIssues();
}

// Toggle Like
function toggleLike(id) {
    if (likedIssues.has(id)) {
        likedIssues.delete(id);
    } else {
        likedIssues.add(id);
    }
    renderIssues();
}

// Toggle Upvote
function toggleUpvote(id) {
    if (upvotedIssues.has(id)) {
        upvotedIssues.delete(id);
    } else {
        upvotedIssues.add(id);
    }
    renderIssues();
}

// Comment on Issue
function commentIssue(id) {
    alert('Comment feature coming soon!');
}

// Share Issue
function shareIssue(id) {
    const issue = issues.find(i => i.id === id);
    if (navigator.share) {
        navigator.share({
            title: issue.title,
            text: issue.description,
            url: window.location.href
        });
    } else {
        alert('Share link copied to clipboard!');
    }
}

// Modal Functions
function openReportModal() {
    document.getElementById('reportModal').classList.add('active');
}

function closeReportModal() {
    document.getElementById('reportModal').classList.remove('active');
    document.getElementById('reportForm').reset();
}

// Handle Form Submission
document.getElementById('reportForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const newIssue = {
        id: issues.length + 1,
        user: 'You',
        avatar: '👤',
        category: document.getElementById('issueCategory').value,
        title: document.getElementById('issueTitle').value,
        description: document.getElementById('issueDescription').value,
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
        location: document.getElementById('issueLocation').value,

        status: 'reported',
        likes: 0,
        comments: 0,
        upvotes: 0,
        timestamp: 'Just now',
        urgency: 'medium',
        assignedTo: null,
        assignedBy: null
    };
    issues.unshift(newIssue);

    // reset filter to show the new issue
    currentFilter = "all";
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector([data-category=="all"]).classList.add('active');

    closeReportModal();
    renderIssues();

    window.alert('Issue reported successfully! 🎉');

});

// Close modal on outside click
document.getElementById('reportModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeReportModal();
    }
});

// Initial render
renderIssues();



















