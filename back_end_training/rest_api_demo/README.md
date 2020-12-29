

## [Replit](https://repl.it/@ancestormithril/DSCTraining#README.md)

## Routes

### Admin user:
```
{
  "username": "admin",
  "password": "admin"
}
```

1. POST, register:
```
https://dsctraining.ancestormithril.repl.co/auth/register
```
2. POST, login:
```
https://dsctraining.ancestormithril.repl.co/auth/login
```
3. POST, create author (admin only):
```
https://dsctraining.ancestormithril.repl.co/authors/create
```
```
{
    "name": "Author x",
    "dateOfBirth": 2000,
    "dateOfDeath": 2020,
    "nationality": "ene"
}
```
4. GET, get all authors:
```
https://dsctraining.ancestormithril.repl.co/authors/
```
5. GET, get one author:
```
https://dsctraining.ancestormithril.repl.co/authors/get_author/
```
```
{
    "authorId": "5fe46921a04c222ce4a0ab60"
}
```
6. GET, search author by name:
```
https://dsctraining.ancestormithril.repl.co/authors/search_author_by_name/
```
```
{
    "name": "unu"
}
```
7. GET, search author by book:
```
https://dsctraining.ancestormithril.repl.co/authors/search_author_by_book/
```
```
{
    "title": "book_one"
}
```
8. PUT, update author (admin only):
```
https://dsctraining.ancestormithril.repl.co/authors/update/
```
```
{
    "authorId": "5fe46921a04c222ce4a0ab60",
    "name": "author one new name",
    "dateOfBirth":2002,
    "nationality": "ro"
}
```
9. DELETE, delete author (admin only):
```
https://dsctraining.ancestormithril.repl.co/authors/delete/
```
```
{
    "authorId": "5fe46921a04c222ce4a0ab60"
}
```
10. POST, create book (admin only):
```
https://dsctraining.ancestormithril.repl.co/books/create/
```
```
{
    "authors": [ "author one" ],
    "title": "carte 8111",
    "publishDate": 2000,
    "price": 1001,
    "stock": 41
}
```
11. GET, get all books:
```

https://dsctraining.ancestormithril.repl.co/books/
```
12. GET, get one book:
```
https://dsctraining.ancestormithril.repl.co/books/get_book/
```
13. GET, search book by title:
```
https://dsctraining.ancestormithril.repl.co/books/search_book_by_title/
```
14. GET, search book by author:
```
https://dsctraining.ancestormithril.repl.co/books/search_book_by_author/
```
15. PUT, update book (admin only):
```
https://dsctraining.ancestormithril.repl.co/books/update/
```
16. DELETE, delete book (admin only):
```
https://dsctraining.ancestormithril.repl.co/books/delete/
```
17. POST, buy book:
```
https://dsctraining.ancestormithril.repl.co/books/buy_book/
```
18. GET, get all users (admin only):
```
https://dsctraining.ancestormithril.repl.co/users/
```
19. GET, get one user (admin only):
```
https://dsctraining.ancestormithril.repl.co/users/get_user/
```
20. PATCH, make user admin (admin only):
```
https://dsctraining.ancestormithril.repl.co/users/make_admin/
```
21. DELETE, delete user (admin only):
```
https://dsctraining.ancestormithril.repl.co/users/delete_user/
```
