let xp = 0;
let health = 100;
let goldCoins = 50;
let currentWeapon = 0;
let fighting;
let enemyHealth;
let inventory = ["Wrench"];

const body = document.querySelector('body');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldcoinsText = document.querySelector("#goldcoinsText");
const enemyStats = document.querySelector("#enemyStats");
const enemyName = document.querySelector("#enemyName");
const enemyHealthText = document.querySelector("#enemyHealth");
const weapons = [
  { name: 'Wrench', power: 5 },
  { name: 'Devo Gun', power: 30 },
  { name: 'Mega Mushroom', power: 50 },
  { name: 'Super Star', power: 100 }
];
const enemies = [
  {
    name: "Koopalings",
    level: 2,
    health: 15
  },
  {
    name: "King Boo",
    level: 8,
    health: 60
  },
  {
    name: "Bowser",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "Mushroom Kingdom",
    "button text": ["Go to store", "Go to Koopa Kingdom", "Fight Bowser"],
    "button functions": [goStore, goKoopa, fightBowser],
    text: "You are in the Mushroom Kingdom. You see a sign that says \"Store\".",
    image: "URL('https://cdn.concreteplayground.com/content/uploads/2022/10/Super-Mario-Bros-Movie_trailer-01_screenshot-02-1024x576.jpg')"
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold coins)", "Buy weapon (30 gold coins)", "Go to Mushroom Kingdom"],
    "button functions": [buyHealth, buyWeapon, goKingdom],
    text: "You enter the store.",
    image: "URL('https://i.pinimg.com/originals/df/96/29/df9629c20480fa6cb0b6241d0fdd3a47.jpg')"
  },
  {
    name: "Koopa Kingdom",
    "button text": ["Fight Koopalings", "Fight King Boo", "Go to Mushroom Kingdom"],
    "button functions": [fightKoopalings, fightBeast, goKingdom],
    text: "You enter the Koopa Kingdom. You see some enemies.", 
    image: "URL('https://vignette.wikia.nocookie.net/sm64community/images/6/67/Mushroom_Kingdom.jpg/revision/latest?cb=20200904194526')"

  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goKingdom],
    text: "You are fighting an enemy.", 

  },
  {
    name: "kill enemy",
    "button text": ["Go to Mushroom Kingdom", "Go to Mushroom Kingdom", "Go to Mushroom Kingdom"],
    "button functions": [goKingdom, goKingdom, easterEgg],
    text: 'The enemy screams "Arg!" as it dies. You gain experience points and find gold coins.', 

  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;", 
    image: "URL('https://th.bing.com/th/id/R.d1b60184dd56372de3425f4f6949f51d?rik=sXWv6Fq4QlnWOg&riu=http%3a%2f%2fwww.solidbackgrounds.com%2fimages%2f2880x1800%2f2880x1800-black-solid-color-background.jpg&ehk=QBcU9Wm9jRp%2f5cI5coMNi6W70Ie48n4UvF4uWFi%2bRhk%3d&risl=&pid=ImgRaw&r=0')"

  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeated Bowser and saved the princess! YOU WIN THE GAME! &#x1F389;", 

  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to Mushroom Kingdom?"],
    "button functions": [pickTwo, pickEight, goKingdom],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
    image: "URL('https://p.turbosquid.com/ts-thumb/Ox/Z4vfmx/7OIwoHhA/image05/png/1572834143/1920x1080/fit_q87/6c0bbe0a3ed00e53d2ba24f8c3be3cb2050ba0cd/image05.jpg')"

  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goKoopa;
button3.onclick = fightBowser;

function update(location) {
  enemyStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;

  if (location.image) {
    body.style.backgroundImage = location.image;
  }
}

function goKingdom() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goKoopa() {
  update(locations[2]);
}

function buyHealth() {
  if (goldCoins >= 10) {
    goldCoins -= 10;
    health += 10;
    goldcoinsText.innerText = goldCoins;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold coins to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (goldCoins >= 30) {
      goldCoins -= 30;
      currentWeapon++;
      goldcoinsText.innerText = goldCoins;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold coins to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold coins";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    goldCoins += 15;
    goldcoinsText.innerText = goldCoins;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightKoopalings() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightBowser() {
  fighting = 2;
  body.style.backgroundImage = "url('https://www.mariocastle.it/w/images/thumb/3/34/MK8_CastellodiBowser.png/1200px-MK8_CastellodiBowser.png')";

  goFight();
}

function goFight() {
  update(locations[3]);
  enemyHealth = enemies[fighting].health;
  enemyStats.style.display = "block";
  enemyName.innerText = enemies[fighting].name;
  enemyHealthText.innerText = enemyHealth;
}

function attack() {
  text.innerText = "The " + enemies[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getEnemyAttackValue(enemies[fighting].level);
  if (isEnemyHit()) {
    enemyHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  enemyHealthText.innerText = enemyHealth;
  if (health <= 0) {
    lose();
  } else if (enemyHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatEnemy();
    }
  }
  /*if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
  */
}

function getEnemyAttackValue(level) {
  const hit = (level * 3) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isEnemyHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + enemies[fighting].name;
}

function defeatEnemy() {
  goldCoins += Math.floor(enemies[fighting].level * 6.7);
  xp += enemies[fighting].level;
  goldcoinsText.innerText = goldCoins;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  goldCoins = 50;
  currentWeapon = 0;
  inventory = ["Wrench"];
  goldcoinsText.innerText = goldCoins;
  healthText.innerText = health;
  xpText.innerText = xp;
  goKingdom();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold coins!";
    goldCoins += 20;
    goldcoinsText.innerText = goldCoins;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}