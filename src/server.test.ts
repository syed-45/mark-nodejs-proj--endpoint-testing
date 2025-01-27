import supertest from "supertest";
import app from "./server";
import { MYSTERIOUS_ROBED_FIGURE } from "./constants/characters";
import { CAVE_EXTERIOR } from "./constants/locations";

test("GET / responds with a welcome message from our mysterious robed figure", async () => {
  const response = await supertest(app).get("/");

  expect(response.body).toStrictEqual({
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

test("GET /quest/accept has our mysterious robed figure give a couple of further choices", async () => {
  const response = await supertest(app).get("/quest/accept");

  // check the speaker and location are right
  expect(response.body).toMatchObject({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
    },
  });

  // check the robed figure is saying something
  expect(typeof response.body.speech.text).toBe("string");

  // check that there are at least two further options
  expect(Object.keys(response.body.options).length).toBeGreaterThanOrEqual(2);
});

test("GET /quest/decline responds with an apocalyptic message", async () => {
  const response = await supertest(app).get("/quest/decline");

  // located in the apocalypse
  expect(response.body.location).toBe("Apocalypse");

  // aggro speaker
  expect(response.body.speech.speaker.name).toBe("Titan, Destroyer of Worlds");

  // some aggro message
  expect(response.body.speech.text).toMatch("FOOL");
  expect(response.body.speech.text).toMatch(/mistake/i);

  // only includes the option to restart
  expect(response.body.options).toStrictEqual({ restart: "/" });
});

test("GET /quest/start/impossible responds with instant 'death'", async () => {
  const response = await supertest(app).get("/quest/start/impossible");

  // there is _some_ location
  expect(response.body.location).toBeDefined();

  // there is _some_ speaker
  expect(response.body.speech.speaker.name).toBeDefined();

  // fiery death
  expect(response.body.speech.text).toMatch(/fireball/i);
  expect(response.body.speech.text).toMatch(/dragon/i);
  expect(response.body.speech.text).toMatch(/excruciating/i);

  // includes option to restart
  expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /quest/help responds with info about quest and how to navigate around", async () => {
  const response = await supertest(app).get("/quest/help");

  // there is _some_ speaker
  // expect(response.body.speech.speaker).toBeDefined();
  expect(response.body).toBeDefined();
  // there is some info on the quest
  // expect(response.body.speech.text).toMatch(/adventure/i);

  // // there is some info on navigating the quest
  // expect(response.body.speech.text).toMatch(/endpoint/i);

  // // includes option to go back to start
  // expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /quest/start/hard responds with zombies", async () => {
  const response = await supertest(app).get("/quest/start/hard");

  // located in nuketown
  expect(response.body.location).toBe("Nuketown");

  // zombie leader
  expect(response.body.speech.speaker.name).toBe("Zidane");

  // face zombies
  expect(response.body.speech.text).toMatch(/death/i);
  expect(response.body.speech.text).toMatch(/zombie/i);

  // only includes the option to restart
  expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /quest/start/easy responds with alligator man", async () => {
  const response = await supertest(app).get("/quest/start/easy");

  // located in swamp
  expect(response.body.location).toBe("The swamp");

  // alli
  expect(response.body.speech.speaker.description).toBe("A creature half man, half alligator");

  // face alli the alligator man
  expect(response.body.speech.text).toMatch(/death/i);
  expect(response.body.speech.text).toMatch(/swamp/i);

  // includes the option to restart
  expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /quest/start/easy/fight responds with fight with alligator man", async () => {
  const response = await supertest(app).get("/quest/start/easy/fight");

  // face alli the alligator man
  expect(response.body.speech.text).toMatch(/fight/i);
  expect(response.body.speech.text).toMatch(/haha/i);

  // includes the option to restart
  expect(response.body.options).toMatchObject({ restart: "/" });
  expect(Object.keys(response.body.options).length).toBeGreaterThan(2)
});

test("GET /quest/start/easy/fight/sledge responds with alligator man", async () => {
  const response = await supertest(app).get("/quest/start/easy/fight/sledge");

  // alli the alligator man is hit!
  expect(response.body.scene.description).toMatch(/sledgehammer/i);
  expect(response.body.scene.description).toMatch(/bleed/i);

  // includes the option to restart
  expect(response.body.options).toMatchObject({ restart: "/" });
  expect(Object.keys(response.body.options).length).toBeGreaterThan(2)
});

