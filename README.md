# Chess Flashcards
### Live Demo: [chanind.github.io/chess-flashcards](https://chanind.github.io/chess-flashcards/)

This is a free and open-source prototype of a flashcards system for
Chess. I find that I'll often watch a YouTube video about a new cool
opening or concept, but then immediately forget everything I learned
in the video when I try to play. This is an attempt to address that by
turning openings and concepts into studyable flashcards.

## Building / Running

This is a NextJS app. You can install dependencies using `yarn install` and then run in dev using `yarn dev`.

## Adding decks

You can add more decks in the `data/database.ts` file. Hopefully the format there should be self-explanatory. You'll just need a list of PGN lines and some metadata about the deck you want to add.

## Contributing

Feel free to open an issue with any bugs / ideas / improvements that you want to discuss. Also, pull requests are welcome!

## Where is this going?

I'll add more openings and content on here as I learn them. If there's
an opening or content you'd like to add, feel free to open a pull
request on Github to create a new deck.

If this becomes popular it might make sense to turn this into a database-backed web application
where anyone can upload their own chess flashcard decks. There's a lot of possible ways this could go, for example adding user accounts and proper spaced repetition studying for the content for long-term retention. For now this is just a plain static site for ease of maintenance and deployment.

## Happy Studying!
