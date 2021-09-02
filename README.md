# Vidly-TS - Movie Rental Plataform

# Objectives

The main objective of this project is to convert an APP built using React-Javascript-Bootstrap to an APP using React-Typescript-SCSS. The idea is to generate unnexpected challanges on the conversion, focusing on the tecnologies istead of the bussiness rules and solutions that will be delivered.

**From:**

- React 16 (using classes, mount/dimount)
- Javascript (no types)
- Bootstrap 5 (built in styles)

**To:**

- React 17 (using functions, useEffect, useState)
- Typescript (hard typed)
- css, scss ([https://sass-lang.com/guide](https://sass-lang.com/guide))


## Vidly

Vidly is a movie rent plataform where you can manage movies, customers, rents and genres. Authentication and authorization is present and all data is consumed from an external API, build in nodejs. 


## DevTecnologies

- Eslint
- Husky
- Git Commit Msg Linter
- Jest


## What was archieve so far - challanges

The challanges were really present. Many research had to be done to convert from react 16 to react 17. Using useState and useEffect with objects comparsion imposed a good challange, because they become different every time a render occur.

**Archievements:**

- Made a single File to handle routes, mapping it inside App.tsx.
- Implemented an abstraction to http calls (AxiosHttpAdapter)
- Used a decorator to intercept unexpected errors from http service.
- Implemented a Log Service using a Decorator to intercept unexpected errors from http calls. (log-http-decorator)  
- Made a helper to handle http responses, resolving expected errors (forbidden, notFound, etc) with the possibility of using Toast Messages.
- Implemented an abstraction to validate schemas (YupAdapter)
- Implemented a dinamic route system.
- Made a component to protect the routes (AuthRoute).
