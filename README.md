A RESTful API for managing books with authentication and role-based access control, built with Node.js, Express, and MongoDB.

This is a backend built on Express and Node to perform CRUD operations on a product (books in this case) via a RESTful API. I used MongoDB via Mongoose to have a quick start and link the project to a database. It wasn’t a huge breakthrough for me technically, as it only manages one product with no complex logic whatsoever. Nevertheless, it helped me get my hands and mind familiar with Express and Node apps, how the environment looks like, and the best ways to structure the project to be scalable and less prone to bugs.

I also added user authentication and authorization logic to make it a little more similar to real-life projects. I used JWT and Bcrypt.js to secure some endpoints and demand a token on every request, and to hash the users’ passwords in the database so that it would be more secure and safe against attacks.

Additionally, I added a global error handler with some AI assistance to map a handler to different error messages and status codes.

also here is the sequence diagram ( or at least what i thought of when writing it and turned out to be simple and always used everywhere lol ) on how secured paths operate like behind the scene 



  ![image](https://github.com/user-attachments/assets/56fe4951-8686-439c-be4e-c6f6647ff53a)
