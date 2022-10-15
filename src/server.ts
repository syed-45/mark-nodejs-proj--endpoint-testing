import express from "express";
import {
  ADVENTURE_ADMIN,
  MYSTERIOUS_ROBED_FIGURE,
} from "./constants/characters";
import { CAVE_EXTERIOR, HANDFORTH_PARISH_COUNCIL } from "./constants/locations";

const app = express();

app.get("/", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text:
        "Welcome, young adventurer, to the ENDPOINT ADVENTURE. Are you ready for this quest?",
    },
    options: {
      yes: "/quest/accept",
      no: "/quest/decline",
      help: "/help",
    },
  });
});

app.get("/help", (req, res) => {
  res.json({
    location: HANDFORTH_PARISH_COUNCIL,
    speech: {
      speaker: ADVENTURE_ADMIN,
      text:
        "This is the endpoint adventure! It's based on the classic 'choose your own adventure' books of ye olden 20th century times. When you visit an endpoint, you're presented with a scene and some text, and then you have a few options to choose from - your simulate turning to a new page by hitting a new endpoint.",
    },
    options: {
      backToStart: "/",
    },
  });
});

app.get("/quest/accept", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text:
        "Ah, yes, that is a wise decision. Now, tell me, what sort of questing experience do you have?",
    },
    options: {
      rookie: "/quest/start/easy",
      pro: "/quest/start/hard",
      "completed it, m8": "/quest/start/impossible",
    },
  });
});

app.get("/quest/decline", (req, res) => {
  res.json({
    location: "Apocalypse",
    speech: {
      speaker: {
        name: "Titan, Destroyer of Worlds",
        description: "A short but fierce looking demon-thing",
      },
      text: "You FOOL! You have made a mistake. Now you will suffer.",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/start/impossible", (req, res) => {
  res.json({
    location: "Venus",
    speech: {
      speaker: {
        name: "Gigantica",
        description: "A large creature",
      },
      text: "THOU SHALL FACE AN EXCRUCIATING DEATH ENFORCED BY THE DRAGONS OF VENUS, FIREBALL!",
    },
    options: {
      fight: "/quest/start/impossible/fight",
      restart: "/",
    },
  });
});

app.get("/quest/start/hard", (req, res) => {
  res.json({
    location: 'Nuketown',
    speech: {
      speaker: {name: 'Zidane', description: 'leader of zombies'},
      text:
        "Muhahaha, my army of zombies will devour you. Death is inevitable.",
    },
    options: {
      restart: '/'
    },
  });
});

app.get("/quest/start/easy", (req, res) => {
  res.json({
    location: 'The swamp',
    speech: {
      speaker: {name: 'Alli', description: 'A creature half man, half alligator'},
      text:
        "Welcome to my swamp, you have come to your death",
    },
    options: {
      restart: '/',
      fight: '/quest/start/easy/fight'
    },
  });
});

app.get("/quest/start/easy/fight", (req, res) => {
  res.json({
    location: 'The swamp',
    speech: {
      speaker: {name: 'Alli', description: 'A creature half man, half alligator'},
      text:
        "haha there is no where to run, fight to your death",
    },
    options: {
      restart: '/',
      'throw sledgehammer': '/sledge',
      'punch him in the face': '/punch',      
    },
  });
});

app.get("/quest/start/easy/fight/sledge", (req, res) => {
  res.json({
    location: 'The swamp',
    speech: {
      speaker: {name: 'Alli', description: 'A creature half man, half alligator'},
      text:
        "Aaargh, you will pay for that! Take that.",
    },
    scene :{
      description: 'Alli the alligator man is hit on the chest with the sledgehammer. He starts to bleed. Alli throws the sledge back at you.'
    },
    options: {
      restart: '/',
      "dodge Alli's throw" : '/dodge',      
      'catch the sledgehammer' : '/catch'
    },
  });
})

//reflections
// tdd gives good environment to produce well written / less breakable code
// allows dev to think ahead for what they want function to do.
//might need to look over regexp in future.


export default app;
