# TV Shows Review Site

This was the group project for Launch Academy's Cohort 33's A-team:
- Josh Halpern: https://github.com/CryHavok01
- Sam Hwang: https://github.com/samshwang
- Jeff Leandre: https://github.com/jleandre
- Alex Trbovic: https://github.com/ATrbovic
- Alejandro Flores: https://github.com/Serolf777

The entire app was built under pair programming so please keep in mind that accounts attributed to the contributions
don't necessarily reflect the work each member of the team put into the code base.

## App Description

A website for users to review their favorite TV Shows.  Users can add shows, write reviews, and up/downvote other users' reviews.

## Technologies Used

- React (front end)
- Express (controller)
- NodeJS (back end)
- PostgreSQL (database)
- Knex and Objection (query builders)

## Sample

You can find a running instance of our website at:

https://boston33-tv-shows-review-site.herokuapp.com

To fully checkout all website capabilities, please log in as an admin via this public administrator account:
- email: admin@test.com
- password: testing123

## Instructions

Download, copy or clone the repository to the directory of your choice and run the following in your project's
root directory to configure the application:

`yarn run install`

Feel free to edit the source code (if you wish) and run the following to run a local web server (via webpack) at
localhost:3000:

`yarn run dev`

The React front end will need initial data to render properly. To set up the database schema and run the seeders,
please run the following from /server directory:

`yarn run migrate:latest`

`yarn run db:seed`

## Support and Questions

For questions and suggestions, please reach out to any or all members of the team.
