# Memory Game
A memory game made in Webstorm IDE, using React.

## Authors
Reut Michaeli


## Score calculation
First, I calculated the highest score possible by multiplying the total number of cards by the number of cards pairs. For example, for a game board of 4 rows and 2 columns, the highest score achievable is: (4*2) * ((4*2) / 2) = 32. (total number of cards is 8, and the number of pairs is 8/2=4).
I also defined the lowest score possible, which is equal to the total number of cards. So in the previous example, the player's score range is between 8 and 32. (As long as the player found all the pairs, they will get a positive score). Then, I decreased the value of the highest score according to the number of steps and the time delay of the game (as long as the score doesn't go below the lowest score): For a time delay of 0.5 or 1.0 : each step reduces the score by 1 point. For a time delay of 1.5 or 2.0, each step reduces the score by 2 points. In conclusion: the score is between the lowest score and the highest score, which are defined by the total number of cards, and with less steps and low time delay, the score will be higher.

## Images shuffle algorithm
I defined an array of the images' URLs according to the total number of cards: The URLs are pushed twice to the array, and according to their order (first is image numbered 0). For example: For a game with 2 rows and 3 columns, a total of 6 cards, the array will have the following images URLs in this order: [0.jpg, 0.jpg, 1.jpg, 1.jpg, 2.jpg, 2.jpg]. Then, the Fisher–Yates algorithm is being executed on this array, shuffling all the images URLs.
Finally, after the array is shuffled thanks to the algorithm, the game cards are being created with the images from the shuffled array according to their order in the array, resulting in shuffled cards every time the game starts.

## Execution
Execute "npm install" in the terminal, then run the program by executing "npm start" in the terminal or a suitable npm run configuration, 
and open [http://localhost:3000](http://localhost:3000) to view it in your browser.
