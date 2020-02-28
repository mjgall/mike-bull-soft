# Language Learning Tool

Live version: llt.gllghr.io

Built to help users interested in learning a new language use the association of images with spoken audio instead of memorization of written, translated vocabulary. Includes authentication with Google OAuth as well as the option to create a user with an email address and password combination. Features password reset functionality with token expiration and email notifications sent to user. Utilizes Amazon Web Services Polly to generate spoken language from text provided by the user. Corresponding to the spoken audio, a user draws one or more images that represent the spoken – this is known as a symbol. A user creates a course, which other users can enroll in. Within a course, lessons are created, which are made up of a number of challenges using the symbols created for the course. A user taking a lesson is presented with these challenges in a quiz format in which the spoken phrase is played and the user must select the image that matches the phrase from a group of four images.

Run `npm run server` in `./` directory and `npm run start` in `./client` to begin development environment.