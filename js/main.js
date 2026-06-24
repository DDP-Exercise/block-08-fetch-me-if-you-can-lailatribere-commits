
import User from "./class.user.js";
import Post from "./class.post.js";

"use strict";

/*******************************************************
 *    Asynchronotrigger - 100p
 *
 *    This is your last assignment. Finish this to proof that
 *    you are a grown up now, who doesn't need to be held by
 *    the hand.
 *
 *    Create a users-class. Fetch the users, create Instances.
 *    - https://jsonplaceholder.typicode.com/users
 *
 *    Create a posts-class. Fetch the posts. create Instances.
 *    Assign them to the users (see userId in the posts).
 *    - https://jsonplaceholder.typicode.com/posts
 *
 *    Print the shit. Beautifully:
 *    List the 10 users. On click, expand them with their posts.
 *    Each Post should also have a Button to "load comments".
 *    Yes, you are correct. This is the perfect usecase for
 *    event-delegation! You can get the comments to a post from either
 *    - https://jsonplaceholder.typicode.com/posts/1/comments
 *    or
 *    - https://jsonplaceholder.typicode.com/comments?postId=1
 *    where "1" stands for the posts ID of course.
 *
 *    I believe in...
 *    Laila - 2026-06-09
 *  *******************************************************/

async function init() {
    try {
        const usersRes  = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersRes.json();

        const postsRes  = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData = await postsRes.json();

        const users = usersData.map(u => new User(u.id, u.name, u.username, u.email, u.website));

        postsData.forEach(p => {
            const post = new Post(p.id, p.title, p.body);
            const user = users.find(u => u.id === p.userId);
            if (user) user.posts.push(post);
        });

        const app = document.getElementById('app');
        app.innerHTML = users.map(u => u.print()).join('');

        app.addEventListener('click', async (e) => {

            const toggle = e.target.closest('[data-toggle]');
            if (toggle && e.target.tagName !== 'A') {
                const posts = document.querySelector(`[data-posts-of="${toggle.dataset.toggle}"]`);
                posts.hidden = !posts.hidden;
            }

            const btn = e.target.closest('[data-load-comments]');
            if (btn) {
                const id  = btn.dataset.loadComments;
                const div = document.querySelector(`[data-comments-of="${id}"]`);
                try {
                    const res      = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
                    const comments = await res.json();
                    div.innerHTML  = comments.map(c => `<p><strong>${c.name}:</strong> ${c.body}</p>`).join('');
                    btn.hidden     = true;
                } catch (err) {
                    console.error(err);
                }
            }
        });

    } catch (err) {
        console.error(err);
    }
}

init();