/**
 * Animates the comments list by moving it from left to right automatically.
 */
function animateCommentsList() {
    const list = document.getElementById('commentsList');
    if (!list) return;
    list.style.position = 'relative';
    let pos = -list.scrollWidth;
    function step() {
        pos += 1;
        if (pos > list.offsetWidth) pos = -list.scrollWidth;
        list.style.transform = `translateX(${pos}px)`;
        requestAnimationFrame(step);
    }
    step();
}
// Wait for comments to load before animating
setTimeout(animateCommentsList, 500);

/**
 * Handles comment form submission and comment list rendering.
 */
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

// Load comments from localStorage
function loadComments() {
    commentsList.innerHTML = '';
    const comments = JSON.parse(localStorage.getItem('kabou_comments') || '[]');
    comments.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.innerHTML = `<div class="comment-header"><span class="comment-name">${c.name}</span> <span class="comment-role">${c.role}</span></div>
            <div class="comment-body">${c.comment}</div>`;
        commentsList.appendChild(div);
    });
}

if (commentForm && commentsList) {
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = commentForm.userName.value.trim();
        const role = commentForm.userRole.value.trim();
        const comment = commentForm.userComment.value.trim();
        if (!name || !role || !comment) return;
        const comments = JSON.parse(localStorage.getItem('kabou_comments') || '[]');
        comments.unshift({ name, role, comment });
        localStorage.setItem('kabou_comments', JSON.stringify(comments));
        commentForm.reset();
        loadComments();
    });

    loadComments();
}

/**
 * Handles navigation menu toggle for mobile.
 */
const menuToggle = document.getElementById('menuToggle');
const navigation = document.querySelector('.navigation');

if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
        navigation.classList.toggle('open');
        // Optional: Aria attributes for accessibility
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.navigation a').forEach(link => {
        link.addEventListener('click', () => {
            if (navigation.classList.contains('open')) {
                navigation.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

/**
 * Handles scroll-to-top button visibility and action.
 */
const mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        if (mybutton) mybutton.style.display = "block";
    } else {
        if (mybutton) mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
if (mybutton) {
    mybutton.onclick = function () {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };
}