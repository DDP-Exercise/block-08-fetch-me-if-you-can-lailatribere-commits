"use strict";

/*******************************************************
 *  Posts
 *
 *  See: https://jsonplaceholder.typicode.com/posts
 *
 *  Your posts should have:
 *      -id
 *      -title
 *      -body
 *
 *  You can skip the userId, your users know their posts (see class.user.js)
 *
 *  posts should also have comments[] (see main.js).
 *
 *  When printing a post, don't forget to make a button that
 *  loads the comments for the post. Once they are loaded, print them.
 *  *******************************************************/


export default class Post {
    #id;
    #title;
    #body;

    constructor(id, title, body) {
        this.#id    = id;
        this.#title = title;
        this.#body  = body;
        this.comments = [];
    }

    get id()    { return this.#id;    }
    get title() { return this.#title; }
    get body()  { return this.#body;  }

    print() {
        return `
        <div data-post-id="${this.#id}">
            <h4>${this.#title}</h4>
            <p>${this.#body}</p>
            <button data-load-comments="${this.#id}">Load Comments</button>
            <div data-comments-of="${this.#id}"></div>
        </div>`;
    }
}