# EventTrackerProject

Project designed for tracking books, leveraging RESTful APIs and frontend technologies such as Angular. It utilizes an existing backend API to construct a user-friendly frontend. 

## Instructions
- Get Book by Id
- Delete By Id
- Get books by Id which displays the option to update the book
- Add a book by inserting title and description. An Id will be given to the Book.
- To find said book you can search the title of the book.
- Check the radio box to track if the book has been read or not
End points:

| HTTP Verb | URI               | Request Body | Response Body | Status Codes |
|-----------|-------------------|--------------|---------------|---------|
| GET       | `/api/books`      |              | List of all _book_ entities | 200 |
| GET       | `/api/books/1`   |              | JSON of _book_ `1` | 200,404 |
| POST      | `/api/books`      | JSON of a new _book_ entity  | JSON of created _book_ |  |
| POST      | `/api/books/2`      | JSON of a new _book_ '2'  | JSON of created _book_ | 201,400 |
| PUT       | `/api/books/1`   | JSON of a new version of _book_ `1`| JSON of updated _book_ | 200,400 |
| DELETE    | `/api/books/1`   |              |               | 204,400|


## Technologies Used

- Angular
- HTTP
- Components
- Services
- Directives
- JSON
- Java
- Spring Boot
- Hibernate
- MySQL
- RESTful API

## Lessons Learned
- Learned how to configure Angular
- Asynchronous requests
- Implementation of CRUD operations in a Spring Boot application.
- Integration of Hibernate with a MySQL database.
- Building RESTful APIs.
- Handling HTTP status codes and responses appropriately.
