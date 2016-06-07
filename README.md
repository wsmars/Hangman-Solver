# Hangman-Solver

* **[Live Demo][live-demo]**

[live-demo]: http://wsmars.github.io/Hangman-Solver/

The application is a program that guesses the words through a RESTful API provided by a Hangman game server.

## How to play
- Click "Start" to get a session and start the game.
- Click "Get a word" to recieve a word, the game has 80 words to guess.
- After you receive a word, the Hangman Solver will give you a suggest letter.
- One word can only be guessed 10 letters. You also can give up the current word and receive a new word by clicking "Get a word".  
- Input a letter and click "Guess" to make a guess.
- You can click "result" to see your current score at anytime after starting the game.
- Click "submit" will finish the game and show your final score.

**Word Difficulty:**
* 1st  to 20th word : length <= 5  letters
* 21st to 40th word : length <= 8  letters
* 41st to 60th word : length <= 12 letters
* 61st to 80th word : length  > 12 letters
