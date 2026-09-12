import { useState } from "react";

export default function BookList({ books }) {
  const [filter, setFilter] = useState("all");

  const counts = {
    all: books.length,
    read: books.filter((b) => b.status === "read").length,
    reading: books.filter((b) => b.status === "reading").length,
    unread: books.filter((b) => b.status === "unread").length,
  };

  const filteredBooks =
    filter === "all" ? books : books.filter((b) => b.status === filter);

  return (
    <>
      <h2>
        <span className="span-header">~/books</span> ${" "}
        <span className="span-command">ls</span>
        <span
          className={filter === "all" ? "active-tag" : "tag"}
          onClick={() => setFilter("all")}
        >
          {" "}
          --all [{counts.all}]
        </span>
        <span
          className={filter === "read" ? "active-tag" : "tag"}
          onClick={() => setFilter("read")}
        >
          {" "}
          --read [{counts.read}]
        </span>
        <span
          className={filter === "reading" ? "active-tag" : "tag"}
          onClick={() => setFilter("reading")}
        >
          {" "}
          --reading [{counts.reading}]
        </span>
        <span
          className={filter === "unread" ? "active-tag" : "tag"}
          onClick={() => setFilter("unread")}
        >
          {" "}
          --unread [{counts.unread}]
        </span>
      </h2>

      <ul className="sidebar list-no-style">
        {filteredBooks.map((book) => {
          if (filter === "all") {
            if (book.status === "read") {
              return (
                <li key={book.slug}>
                  - [x]{" "}
                  <s>
                    {book.author} :: <span>{book.title}</span>
                  </s>
                </li>
              );
            } else if (book.status === "reading") {
              return (
                <li key={book.slug}>
                  - [~] {book.author} :: <span>{book.title}</span>
                </li>
              );
            } else {
              return (
                <li key={book.slug}>
                  - [ ] {book.author} :: <span>{book.title}</span>
                </li>
              );
            }
          } else {
            if (book.status === "read") {
              return (
                <li key={book.slug}>
                  - [x] {book.author} :: <span>{book.title}</span> :: [
                  {book.startedAt ?? "undefined"} -{" "}
                  {book.completedAt ?? "undefined"}] ::{" "}
                  {book.rating === undefined ? "undefined" : `${book.rating}/5`}
                </li>
              );
            } else if (book.status === "reading") {
              return (
                <li key={book.slug}>
                  - [~] {book.author} :: <span>{book.title}</span> :: [
                  {book.startedAt ?? "undefined"} - current]
                </li>
              );
            } else {
              return (
                <li key={book.slug}>
                  - [ ] {book.author} :: <span>{book.title}</span>
                </li>
              );
            }
          }
        })}
      </ul>
      <style>
        {`
.active-tag, .tag {cursor: pointer; }
.active-tag { color: var(--color-argument);}
.tag { color: var(--color-link); }
.tag:hover { color: var(--color-accent-violet); }
`}
      </style>
    </>
  );
}
