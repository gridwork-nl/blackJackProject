Dear codeworks team,

Thank you for taking the time to read me!

This folder contains the production setup for the admission challenge.
The project has been built using vanilla JS and SCSS.

To view the app in live production, please visit https://onlineblackjackapp.netlify.app/

You can also view the source code in my GitHub account at https://github.com/gridwork-nl/blackJackProject

Version 1.1

The ace bug has been fixed by evaluating the player points total outside of the loop in the aceCheck function because inside the loop it was evaluating the player points total for each individual hand array index so it didn't get the total amount properly.

By setting the player points total to player.points (up until previous turn) + the last item in the hand array index (current turn), the player points get evaluated as a whole before the evaluating of the ace starts.
