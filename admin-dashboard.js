
document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // --- FUNCTION DEFINITIONS ---
    // =======================================================

    // --- Function to load dashboard summary stats ---
    async function loadDashboardStats() {
        try {
            const response = await fetch('api_get_stats.php');
            if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
            const result = await response.json();
            document.getElementById('totalUsersStat').textContent = result.data.totalUsers;
            document.getElementById('totalInternsStat').textContent = result.data.totalInterns;
            document.getElementById('totalStaffStat').textContent = result.data.totalStaff;
        } catch (error) {
            console.error("Could not load dashboard stats:", error);
            document.getElementById('totalUsersStat').textContent = 'N/A';
            document.getElementById('totalInternsStat').textContent = 'N/A';
            document.getElementById('totalStaffStat').textContent = 'N/A';
        }
    }

    // --- Functions for Announcements ---
    const announcementForm = document.getElementById('announcementForm');
    const announcementsList = document.getElementById('announcementsList');

    const renderAnnouncements = (announcements) => {
        if (!announcementsList) return;
        announcementsList.innerHTML = '';
        announcements.forEach(ann => {
            const item = document.createElement('div');
            item.className = 'announcement-item';
            item.innerHTML = `
                <div class="announcement-header"><div class="announcement-title">${ann.title}</div></div>
                <div class="announcement-date">UIP STAFF | ${ann.date}</div>
                <div class="announcement-status">Status: ${ann.status}</div>
                <div class="announcement-greeting">${ann.greeting}</div>
                <p class="announcement-content">${ann.content.replace(/\n/g, '<br>')}</p>
                <div class="announcement-actions">
                    <button class="delete-btn" onclick="deleteAnnouncement(${ann.id})">Delete</button>
                </div>
            `;
            announcementsList.appendChild(item);
        });
    };

    const fetchAnnouncements = async () => {
        if (!announcementsList) return;
        try {
            const response = await fetch('api_get_announcements.php');
            if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
            const announcements = await response.json();
            renderAnnouncements(announcements);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    // --- Functions for Account Approvals ---
    const fetchPendingUsers = async () => {
        const approvalList = document.getElementById('approvalList');
        if (!approvalList) return;
        try {
            const response = await fetch('api_get_pending_users.php');
            if (!response.ok) {
                // If the server sends an error, we can read it as text to see the PHP error
                const errorText = await response.text();
                throw new Error(`Server returned an error: ${response.statusText}. Response: ${errorText}`);
            }
            const pendingUsers = await response.json();
            approvalList.innerHTML = '';
            pendingUsers.forEach(user => {
                const initials = user.full_name.split(' ').map(n => n[0]).join('');
                const userItem = document.createElement('div');
                userItem.className = 'approval-item';
                userItem.innerHTML = `
                    <div class="user-info"><div class="user-avatar">${initials}</div><div class="user-details"><h4>${user.full_name}</h4><p>${user.role}</p></div></div>
                    <div class="approval-actions"><button class="approve-btn" onclick="handleApproval(${user.id}, true)">Approve</button><button class="deny-btn" onclick="handleApproval(${user.id}, false)">Deny</button></div>
                `;
                approvalList.appendChild(userItem);
            });
        } catch (error) {
            console.error("Error fetching pending users:", error);
            approvalList.innerHTML = '<p style="color: red;">Error loading pending users. Check the console.</p>';
        }
    };

    // --- THIS IS THE MISSING FUNCTION THAT CAUSED THE ReferenceError ---
    const fetchOffboardingRequests = async () => {
        const offboardingList = document.getElementById('offboardingList');
        if (!offboardingList) return;
        offboardingList.innerHTML = '<p>Off-boarding feature coming soon.</p>';
    };

    // =======================================================
    // --- EVENT LISTENERS & GLOBAL FUNCTIONS ---
    // =======================================================

    // --- Announcements Form Listener ---
    if (announcementForm) {
        announcementForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newAnnouncement = {
                title: document.getElementById('announcementTitle').value,
                content: document.getElementById('announcementContent').value,
                greeting: document.getElementById('announcementGreeting').value,
                status: document.getElementById('announcementStatus').value
            };
            await fetch('api_add_announcement.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAnnouncement)
            });
            fetchAnnouncements();
            announcementForm.reset();
        });
    }

    window.deleteAnnouncement = async (id) => {
        if (confirm('Are you sure you want to delete this announcement?')) {
            await fetch('api_delete_announcement.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            });
            fetchAnnouncements();
        }
    };

    // --- Account Approval Listener ---
    window.handleApproval = async (userId, isApproved) => {
        await fetch('api_handle_approval.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, isApproved })
        });
        fetchPendingUsers();
    };

    // --- UI Listeners (Dropdown, Logout, etc.) ---
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('userDropdown')?.classList.toggle('show');
        });
    }

    document.addEventListener('click', () => {
        document.getElementById('userDropdown')?.classList.remove('show');
    });

    // =======================================================
    // --- INITIAL PAGE LOAD ---
    // =======================================================
    loadDashboardStats();
    fetchPendingUsers();
    fetchOffboardingRequests();
    fetchAnnouncements();
});
