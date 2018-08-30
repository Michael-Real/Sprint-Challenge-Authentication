<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
Middleware is software that acts as a network bridge between a database and code. Sessions store information about clients using cookies, allowing credentials to be stored for future use. bcrypt is a password hashing function, uses the Eksblowfish algorithm. JWT (JSON web tokens) is a string containing a header, payload, and signature that hashes information.
2.  What does bcrypt do in order to prevent attacks?
Obscures information contained within via hashing algorithms that are extremely difficult to penetrate to access the info.

3.  What are the three parts of the JSON Web Token?
Header (type + hashing algorithm), payload (carries claims), signature (hasehes the header, payload, and secret).