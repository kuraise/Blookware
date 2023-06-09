/**
Created by kura#6311
file: src//source.js
last updated: 4/30/2023
description: non-minified/non-obfuscated source of Blookware
https://github.com/kuraise
*/

(async () => {
    let current_version = "v1.2.0";
    let i = document.createElement('iframe');
    document.body.append(i);
    window.confirm = i.contentWindow.confirm.bind(window);
    i.remove();

    let n = document.createElement('iframe');
    document.body.append(n);
    window.alert = n.contentWindow.alert.bind(window);
    window.prompt = n.contentWindow.prompt.bind(window);
    window.confirm = n.contentWindow.confirm.bind(window);
    n.remove();
    const addStyles = (element, styles = {}) => Object.entries(styles).forEach(([key, value]) => element.style[key] = value);
    let style = document.createElement('style');
    style.innerHTML = (`details > summary { cursor: pointer; transition: 0.15s; list-style: none; } details > summary:hover { color: hsl(0, 0%, 50%) } details > summary::-webkit-details-marker { display: none; } details summary ~ * { animation: sweep .5s ease-in-out; } @keyframes sweep { 0%    {opacity: 0; transform: translateY(-10px)} 100%  {opacity: 1; transform: translateY(0)} } .cheat { border: none; background: #4631bd; padding: 5px; margin: 3px; width: 60%; color: hsl(0, 0%, 100%); transition: 0.2s; border-radius: 5px; cursor: pointer; } .cheat:hover { background: hsl(0, 0%, 30%); }`);
    
    const GUI = document.createElement('div');
    [...document.querySelectorAll("#GUI")].forEach(x => x.remove());
    GUI.id = "GUI";
    GUI.appendChild(style);
    addStyles(GUI, {
        width: '400px',
        /* //height: '500px', */
        background: 'linear-gradient(to bottom right, #26284E, #14152A)',
        position: 'absolute',
        textAlign: 'center',
        fontFamily: "url('https://fonts.cdnfonts.com/css/poppins')",
        color: '#F2F5FC',
        overflow: 'hidden',
        top: '50px',
        left: '50px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' /*"5px solid #4631bd"*/,
    });

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    GUI.onpointerdown = ((e = window.event) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointerup = (() => {
            document.onpointerup = null;
            document.onpointermove = null;
        });
        document.onpointermove = ((e) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            GUI.style.top = (GUI.offsetTop - pos2) + "px";
            GUI.style.left = (GUI.offsetLeft - pos1) + "px";
        });
    });

    let header = document.createElement('div');
    GUI.appendChild(header);
    addStyles(header, {
        width: '100%',
        height: '35px',
        paddingTop: '2px',
        fontSize: '1.5rem',
        textAlign: 'center'
    });
    header.innerHTML = `Blookware <span style="font-size: 0.75rem">${current_version}</span>`;

    let close = document.createElement('button');
    header.appendChild(close);
    addStyles(close, {
        background: "url('https://raw.githubusercontent.com/kuraise/Blookware/main/images/closeBTN.png')",
        height: '20px',
        width: '20px',
        border: 'none',
        cursor: 'pointer',
        position: 'absolute',
        top: '7px',
        right: '7px',
        fontSize: '1.5rem',
        paddingTop: '10px',
        paddingRight: '15px',
    }); 
    close.onclick = () => {
        offLocationChange();
        GUI.remove();
        removeEventListener('keypress', toggleHidden)
    }
    
    let bodyDiv = document.createElement('div');
    let body = document.createElement('div');

    bodyDiv.appendChild(body);
    GUI.appendChild(bodyDiv);

    body.innerHTML = (`<span id="curPageEl">${getSite(true) ? `Current gamemode: ${getSite(true)}` : 'No game detected'}</span><br><span>(Press Z to hide)</span><br>`);
    body.style.display = 'block';
    body.style.margin = '10px';
/* //body.style.background = 'white'; */

    document.body.append(GUI);

    let footer = document.createElement('div');
    bodyDiv.appendChild(footer);
    footer.style.fontSize = '0.9rem';
    footer.style.paddingBottom = '5px';

    footer.innerHTML = (`<span><a target="blank" href="https://github.com/kuraise" style="text-decoration: none;">Made by kura#6311</a></span>`);

    let cheats = ({
        global: [
            {
                name: "Auto Answer (Toggle)",
                description: "Toggles auto answer on",
                type: "toggle",
                enabled: false,
                data: null,
                run: function () {
                    if (!this.enabled) {
                        this.enabled = true;
                        this.data = setInterval(() => {
                            const { stateNode: { state: { question, stage, feedback }, props: { client: { question: pquestion } } } } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                            try {
                                if (question.qType != "typing") if (stage !== "feedback" && !feedback) [...document.querySelectorAll(`[class*="answerContainer"]`)][(question || pquestion).answers.map((x, i) => (question || pquestion).correctAnswers.includes(x) ? i : null).filter(x => x != null)[0]]?.click?.();
                                else document.querySelector('[class*="feedback"]')?.firstChild?.click?.();
                                else Object.values(document.querySelector("[class*='typingAnswerWrapper']"))[1].children._owner.stateNode.sendAnswer(question.answers[0])
                            } catch { }
                        }, 50);
                    } else {
                        this.enabled = false;
                        clearInterval(this.data);
                        this.data = null;
                    }
                }
            },
            {
                name: "Highlight Answers (Toggle)",
                description: "Toggles highlight answers on",
                type: "toggle",
                enabled: false,
                data: null,
                run: function () {
                    if (!this.enabled) {
                        this.enabled = true;
                        this.data = setInterval(() => {
                            const { stateNode: { state, props } } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                            [...document.querySelectorAll(`[class*="answerContainer"]`)].forEach((answer, i) => {
                                if ((state.question || props.client.question).correctAnswers.includes((state.question || props.client.question).answers[i])) answer.style.backgroundColor = "rgb(0, 207, 119)";
                                else answer.style.backgroundColor = "rgb(189, 15, 38)";
                            });
                        }, 50);
                    } else {
                        this.enabled = false;
                        clearInterval(this.data);
                        this.data = null;
                    }
                }
            },
            {
                name: "Auto Answer",
                description: "Click the correct answer for you",
                run: function () {
                    const { stateNode: { state: { question, stage, feedback }, props: { client: { question: pquestion } } } } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    try {
                        if (question.qType != "typing") if (stage !== "feedback" && !feedback) [...document.querySelectorAll(`[class*="answerContainer"]`)][(question || pquestion).answers.map((x, i) => (question || pquestion).correctAnswers.includes(x) ? i : null).filter(x => x != null)[0]]?.click?.();
                        else document.querySelector('[class*="feedback"]')?.firstChild?.click?.();
                        else Object.values(document.querySelector("[class*='typingAnswerWrapper']"))[1].children._owner.stateNode.sendAnswer(question.answers[0])
                    } catch { }
                }
            },
            {
                name: "Highlight Answers",
                description: "Colors answers to be red or green highlighting the correct ones",
                run: function () {
                    const { stateNode: { state, props } } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    [...document.querySelectorAll(`[class*="answerContainer"]`)].forEach((answer, i) => {
                        if ((state.question || props.client.question).correctAnswers.includes((state.question || props.client.question).answers[i])) answer.style.backgroundColor = "rgb(0, 207, 119)";
                        else answer.style.backgroundColor = "rgb(189, 15, 38)";
                    });
                }
            },
            {
                name: "Spam Buy Blooks",
                description: "Opens a box an amount of times",
                run: function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.alert = i.contentWindow.alert.bind(window);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    window.confirm = i.contentWindow.confirm.bind(window);
                    i.remove();
                    let { webpack } = webpackJsonp.push([[], { ['1234']: (_, a, b) => { a.webpack = b }, }, [['1234']]]),
                        axios = Object.values(webpack.c).find((x) => x.exports?.a?.get).exports.a,
                        { purchaseBlookBox } = Object.values(webpack.c).find(x => x.exports.a?.purchaseBlookBox).exports.a;

                    axios.get("https://dashboard.blooket.com/api/users").then(async ({ data: { tokens } }) => {
                        let prices = Object.values(webpack.c).find(x => x?.exports?.a?.Safari).exports.a || { Medieval: 20, Breakfast: 20, Wonderland: 20, Blizzard: 25, Space: 20, Bot: 20, Aquatic: 20, Safari: 20, Dino: 25, "Ice Monster": 25, Outback: 25 }
                        let box = prompt("Which box do you want to open? (ex: \"Ice Monster\")").split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(' ');
                        if (!Object.keys(prices).map(x => x.toLowerCase()).includes(box.toLowerCase())) return alert("I couldn't find that box!");

                        let amount = Math.min(Math.floor(tokens / Object.entries(prices).find(x => x[0].toLowerCase() == box.toLowerCase())[1]), parseInt(`0${prompt("How many boxes do you want to open?")}`));
                        if (amount == 0) return alert("You do not have enough tokens!");

                        let alertBlooks = confirm("Would you like to alert blooks upon unlocking?");
                        let blooks = {};
                        let now = Date.now();
                        let error = false;

                        for (let i = 0; i < amount; i++) {
                            await purchaseBlookBox({ boxName: box }).then(({ isNewToUser, tokens, unlockedBlook }) => {
                                blooks[unlockedBlook] ||= 0;
                                blooks[unlockedBlook]++;

                                let before = Date.now();

                                if (alertBlooks) alert(`${unlockedBlook} (${i + 1}/${amount}) ${isNewToUser ? "NEW! " : ''}${tokens} tokens left`);

                                now += Date.now() - before;
                            }).catch(e => error = true);
                            if (error) break;
                        }
                        alert(`(${Date.now() - now}ms) Results:\n${Object.entries(blooks).map(([blook, amount]) => `    ${blook} ${amount}`).join(`\n`)}`);
                    }).catch(() => alert('There was an error user data!'));
                }
            },
            {
                name: "Sell Cheap Duplicates",
                description: "Sells all of your uncommon to epic dupes (not legendaries+)",
                run: function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.alert = i.contentWindow.alert.bind(window);
                    window.confirm = i.contentWindow.confirm.bind(window);
                    i.remove();
                    let { webpack } = webpackJsonp.push([[], { ['1234']: (_, a, b) => { a.webpack = b }, }, [['1234']]]),
                        axios = Object.values(webpack.c).find((x) => x.exports?.a?.get).exports.a,
                        { sellBlook } = Object.values(webpack.c).find(x => x.exports.a?.sellBlook).exports.a;
                    axios.get("https://dashboard.blooket.com/api/users").then(async ({ data: { unlocks } }) => {
                        let blooks = Object.entries(unlocks).filter(([blook, amount]) => amount > 1 && !["Legendary", "Chroma", "Mystical"].includes(webpackJsonp.push([[], { ['1234']: (_, a, b) => { a.webpack = b } }, [['1234']]]).webpack("MDrD").a[blook].rarity));
                        if (confirm(`Are you sure you want to sell your uncommon to epic dupes?`)) {
                            let now = Date.now();
                            for (const [blook, amount] of blooks) await sellBlook({ blook, numToSell: amount - 1 });
                            alert(`(${Date.now() - now}ms) Results:\n${blooks.map(([blook, amount]) => `    ${blook} ${amount - 1}`).join(`\n`)}`);
                        }
                    }).catch(() => alert('There was an error user data!'));
                }
            },
            {
                name: "Sell Duplicate Blooks",
                description: "Sell all duplicate blooks leaving you with 1 each",
                run: function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.alert = i.contentWindow.alert.bind(window);
                    window.confirm = i.contentWindow.confirm.bind(window);
                    i.remove();
                    let { webpack } = webpackJsonp.push([[], { ['1234']: (_, a, b) => { a.webpack = b }, }, [['1234']]]),
                        axios = Object.values(webpack.c).find((x) => x.exports?.a?.get).exports.a,
                        { sellBlook } = Object.values(webpack.c).find(x => x.exports.a?.sellBlook).exports.a;
                    axios.get("https://dashboard.blooket.com/api/users").then(async ({ data: { unlocks } }) => {
                        let blooks = Object.entries(unlocks).filter(x => x[1] > 1);
                        if (confirm(`Are you sure you want to sell your dupes?`)) {
                            let now = Date.now();
                            for (const [blook, amount] of blooks) await sellBlook({ blook, numToSell: amount - 1 });
                            alert(`(${Date.now() - now}ms) Results:\n${blooks.map(([blook, amount]) => `    ${blook} ${amount - 1}`).join(`\n`)}`);
                        }
                    }).catch((e) => (alert('There was an error user data!'), console.info(e)));
                }
            },
            {
                name: "Flood Game",
                description: "Floods a game with a number of fake accounts",
                run: async function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();

                    const id = prompt("Game ID:");
                    const name = prompt("Name:");
                    const amount = parseInt(prompt("Amount:"));

                    let { webpack } = webpackJsonp.push([[], { ['1234']: (_, a, b) => { a.webpack = b }, }, [['1234']]]);
                    const axios = Object.values(webpack.c).find((x) => x.exports?.a?.get).exports.a;
                    const firebase = Object.values(webpack.c).find(x => x.exports?.a?.initializeApp).exports.a;

                    for (let i = 1; i <= amount; i++) {
                        (async () => {
                            const { data: { success, fbToken, fbShardURL } } = await axios.put("https://fb.blooket.com/c/firebase/join", { id, name: `${name}${i}` });
                            if (!success) return;
                            const liveApp = firebase.initializeApp({
                                apiKey: "AIzaSyCA-cTOnX19f6LFnDVVsHXya3k6ByP_MnU",
                                authDomain: "blooket-2020.firebaseapp.com",
                                projectId: "blooket-2020",
                                storageBucket: "blooket-2020.appspot.com",
                                messagingSenderId: "741533559105",
                                appId: "1:741533559105:web:b8cbb10e6123f2913519c0",
                                measurementId: "G-S3H5NGN10Z",
                                databaseURL: fbShardURL
                            }, `${name}${i}`);
                            const auth = firebase.auth(liveApp);
                            await auth.setPersistence(firebase.auth.Auth.Persistence.NONE).catch(console.error);
                            await auth.signInWithCustomToken(fbToken).catch(console.error);
                            await liveApp.database().ref(`${id}/c/${name}${i}`).set({ b: "Black" });
                            liveApp.delete();
                        })();
                        await new Promise(r => setTimeout(r, 100));
                    }
                }
            },
            {
                name: "Get Max Tokens & XP Daily",
                description: "Gets max daily tokens and xp",
                run: function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.alert = i.contentWindow.alert.bind(window);
                    i.remove();
                    if (!location.href.includes("play.blooket.com")) (alert("[BLOOKWARE] => not on play.blooket.com, press continue to open site, then re-execute script..."), window.open("https://play.blooket.com/"));
                    else {
                        var axios = Object.values(webpackJsonp.push([[], { ['']: (_, a, b) => { a.cache = b.c }, }, [['']],]).cache).find((x) => x.exports?.a?.get).exports.a;
                        axios.post("https://play.blooket.com/api/playersessions/solo", { gameMode: "Factory" }).then(({ data: { t } }) => {
                            axios.get("https://play.blooket.com/api/users/me").then(({ data: { name } }) => {
                                axios.put("https://play.blooket.com/api/users/add-rewards", { t, name, addedTokens: 500, addedXp: 300 })
                                    .then(({ data: { dailyReward } }) => alert(`Added max tokens and xp, and got ${dailyReward} daily wheel tokens!`))
                                    .catch(() => alert('There was an error when adding rewards.'));
                            }).catch(() => alert('There was an error user data.'));
                        });
                    }
                }
            },
            {
                name: "Use Any Blook",
                description: "Allows you to play as any blook",
                run: function () {
                    const { stateNode } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    const blooks = webpackJsonp.push([[], { ['1234']: (_, a, b) => { a.webpack = b } }, [['1234']]]).webpack("MDrD").a;
                    if (location.pathname == "/blooks") stateNode.setState({ blookData: Object.keys(blooks).reduce((a, b) => (a[b] = (stateNode.state.blookData[b] || 1), a), {}), allSets: Object.values(blooks).reduce((a, b) => (a.includes(b.set) ? a : a.concat(b.set)), []) });
                    else if (Array.isArray(stateNode.state.unlocks)) stateNode.setState({ unlocks: Object.keys(blooks) });
                    else stateNode.setState({ unlocks: blooks });
                }
            },
            {
                name: "Unlock Plus Gamemodes [POSSIBLY PATCHED]",
                description: "Allows you to play any gamemode that is plus only",
                run: function () {
                    Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode.setState(state => (state.gameModes.forEach(gm => gm.plusOnly = false), state));
                }
            }
        ],
        defense: [
            {
                name: "Earthquake",
                description: "Shuffles around towers",
                run: function () {
                    let { stateNode } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    stateNode.setState({
                        eventName: "Earthquake",
                        event: {
                            short: "e",
                            color: "#805500",
                            icon: "fas fa-mountain",
                            desc: "All of your towers get mixed up",
                            rate: .02
                        },
                        buyTowerName: "",
                        buyTower: {}
                    }, () => stateNode.eventTimeout = setTimeout(() => stateNode.setState({ event: {}, eventName: "" }), 6e3));
                    stateNode.tiles.forEach(row => row.forEach((col, i) => col === 3 && (row[i] = 0)));
                    let tiles = stateNode.tiles.flatMap((_, y) => _.map((__, x) => __ === 0 && ({ x, y }))).filter(Boolean).sort(() => .5 - Math.random());
                    stateNode.towers.forEach(tower => {
                        let { x, y } = tiles.shift();
                        tower.move(x, y, stateNode.tileSize);
                        stateNode.tiles[y][x] = 3;
                    });
                }
            },
            {
                name: "Max Tower Stats",
                description: "Makes all placed towers overpowered",
                run: function () {
                    let { stateNode } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    stateNode.towers.forEach(tower => {
                        tower.range = 100;
                        tower.fullCd = tower.cd = 0;
                        tower.damage = 1e6;
                    });
                }
            },
            {
                name: "Remove Ducks",
                description: "Removes ducks",
                run: function () {
                    let { stateNode: { ducks, tiles } } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    ducks.forEach(x => { tiles[x.y][x.x] = 0; });
                    ducks.length = 0;
                }
            },
            {
                name: "Remove Enemies",
                description: "Removes all the enemies",
                run: function () {
                    let { stateNode } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    stateNode.enemies = stateNode.futureEnemies = [];
                }
            },
            {
                name: "Remove Obstacles",
                description: "Lets you place towers anywhere",
                run: function () {
                    let { stateNode } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    stateNode.tiles = stateNode.tiles.map(row => row.fill(0));
                }
            },
            {
                name: "Set Damage",
                description: "Sets damage",
                run: function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode.dmg = Number(parseInt(prompt("How much dmg would you like?")));
                }
            },
            {
                name: "Set Round",
                description: "Sets the current round",
                run: function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode.setState({ round: Number(parseInt(prompt("What round do you want to set to?"))) })
                }
            },
            {
                name: "Set Tokens",
                description: "Sets the amount of tokens you have",
                run: function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode.setState({ tokens: Number(parseInt(prompt("How many tokens would you like?"))) })
                }
            }
        ],
        defense2: [
            {
                name: "Auto Start Round",
                description: "Automatically starts the round when finished",
                type: "toggle",
                enabled: false,
                data: null,
                run: function() {
                    let start_btn = document.getElementById("nextRound")
                    let start_text = start_btn.innerText
                    let continue_div = document.getElementsByClassName("arts__modal___VpEAD-camelCase")
                    if (start_text === "Start" && continue_div === null) start_btn.click()
                }
            },
            {
                name: "Max Tower Stats",
                description: "Makes all placed towers overpowered",
                run: function () {
                    Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode.state.towers.forEach(tower => {
                        tower.stats.dmg = 1e6;
                        tower.stats.fireRate = 50;
                        tower.stats.ghostDetect = true;
                        tower.stats.maxTargets = 1e6;
                        tower.stats.numProjectiles &&= 100;
                        tower.stats.range = 100;
                        if (tower.stats.auraBuffs) for (const buff in tower.stats.auraBuffs) tower.stats.auraBuffs[buff] *= 100;
                    });
                }
            },
            {
                name: "Kill Enemies",
                description: "Kills all the enemies",
                run: function () {
                    let { stateNode } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    stateNode.state.game.scene.enemyQueue.length = 0;
                    stateNode.state.game.scene.physics.world.bodies.entries.forEach(x => x?.gameObject?.receiveDamage?.(x.gameObject.hp, 1));
                }
            },
            {
                name: "Set Coins",
                description: "Sets coins",
                run: function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode.setState({ coins: Number(parseInt(prompt("How many tokens would you like?"))) })
                }
            },
            {
                name: "Set Health",
                description: "Sets the amount of health you have",
                run: function (health) {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode.setState({ health: Number(parseInt(prompt("How much health do you want?"))) });
                }
            },
            {
                name: "Set Round",
                description: "Sets the current round",
                run: function (round) {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode.setState({ round: Number(parseInt(prompt("What round do you want to set to?"))) })
                }
            },
        ],
        hack: [
            {
                name: "Choice ESP",
                description: "Shows what each choice will give you",
                type: "toggle",
                enabled: false,
                data: null,
                run: function () {
                    if (!this.enabled) {
                        this.enabled = true;
                        this.data = setInterval(() => {
                            let { stateNode } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                            let { text } = stateNode.state.choices[0];
                            let chest = document.querySelector('[class^=styles__feedbackContainer___]');
                            if (chest.children.length <= 4) {
                                let choice = document.createElement('div')
                                choice.style.color = "white";
                                choice.style.fontFamily = "Inconsolata,Helvetica,monospace,sans-serif";
                                choice.style.fontSize = "2em";
                                choice.style.display = "flex";
                                choice.style.justifyContent = "center";
                                choice.style.marginTop = "675px";
                                choice.innerText = text;
                                chest.append(choice);
                            }
                        }, 50);
                    } else {
                        this.enabled = false;
                        clearInterval(this.data);
                        this.data = null;
                    }
                }
            },
            {
                name: "Password ESP",
                description: "Highlights the correct password",
                type: "toggle",
                enabled: false,
                data: null,
                run: function () {
                    if (!this.enabled) {
                        this.enabled = true;
                        this.data = setInterval(() => {
                            let { state } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode;
                            if (state.stage == "hack") [...document.querySelector('div[class^=styles__buttonContainer]').children].forEach(button => {
                                if (button.innerText == state.correctPassword) return;
                                button.style.outlineColor = "rgba(255, 64, 64, 0.8)";
                                button.style.backgroundColor = "rgba(255, 64, 64, 0.8)";
                                button.style.textShadow = "0 0 1px #f33";
                            });
                        }, 50);
                    } else {
                        this.enabled = false;
                        clearInterval(this.data);
                        this.data = null;
                    }
                }
            },
            {
                name: "Always Triple",
                description: "Always get triple crypto",
                type: "toggle",
                enabled: false,
                data: null,
                run: function () {
                    if (!this.enabled) {
                        this.enabled = true;
                        this.data = setInterval(() => Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode.setState({ choices: [{ type: "mult", val: 3, rate: .075, blook: "Brainy Bot", text: "Triple Crypto" }] }), 50);
                    } else {
                        this.enabled = false;
                        clearInterval(this.data);
                        this.data = null;
                    }
                }
            },
            {
                name: "Auto Guess",
                description: "Automatically guess the correct password",
                type: "toggle",
                enabled: false,
                data: null,
                run: function () {
                    if (!this.enabled) {
                        this.enabled = true;
                        this.data = setInterval(() => {
                            let { state } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode;
                            if (state.stage == "hack") for (const button of document.querySelector('div[class^=styles__buttonContainer]').children) button.innerText == state.correctPassword && button.click();
                        }, 50);
                    } else {
                        this.enabled = false;
                        clearInterval(this.data);
                        this.data = null;
                    }
                }
            },
            {
                name: "Remove Hack",
                description: "",
                run: function () {
                    Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode.setState({ hack: "" });
                }
            },
            {
                name: "Set Crypto",
                description: "Sets crypto",
                run: function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    let amount = Number(parseInt(prompt("How much crypto would you like?")));
                    let { stateNode } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    stateNode.setState({ crypto: amount, crypto2: amount });
                    stateNode.props.liveGameController.setVal({
                        path: "c/".concat(stateNode.props.client.name),
                        val: {
                            b: stateNode.props.client.blook,
                            p: stateNode.state.password,
                            cr: amount
                        }
                    });
                }
            },
            {
                name: "Set Password",
                description: "Sets hacking password",
                run: function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    let password = prompt("What do you want to set your password to?");
                    let { stateNode } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    stateNode.setState({ password });
                    stateNode.props.liveGameController.setVal({
                        path: "c/".concat(stateNode.props.client.name),
                        val: {
                            b: stateNode.props.client.blook,
                            p: password,
                            cr: stateNode.state.crypto
                        }
                    });
                }
            },
            {
                name: "Steal Player's Crypto",
                description: "Steals all of someone's crypto",
                run: function () {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    let target = prompt("Who's crypto would you like to steal?");
                    let { stateNode } = Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner;
                    stateNode.props.liveGameController.getDatabaseVal("c", (players) => {
                        if (players && Object.keys(players).map(x => x.toLowerCase()).includes(target.toLowerCase())) {
                            let [player, { cr }] = Object.entries(players).find(([name]) => name.toLowerCase() == target.toLowerCase());
                            console.log(!!players, players, player, cr, stateNode.state)
                            stateNode.setState({
                                crypto: stateNode.state.crypto + cr,
                                crypto2: stateNode.state.crypto + cr
                            });
                            stateNode.props.liveGameController.setVal({
                                path: "c/".concat(stateNode.props.client.name),
                                val: {
                                    b: stateNode.props.client.blook,
                                    p: stateNode.state.password,
                                    cr: stateNode.state.crypto + cr,
                                    tat: `${player}:${cr}`
                                }
                            });
                            console.log('done')
                        }
                    })
                }
            }
        ],
    })// .map(x => [x[0], x[1].reduce((a, b) => (a[b.name] = b.run, a), {})]).reduce((a, [b, c]) => (a[b] = c, a), {});

    let global = document.createElement('details');
    global.innerHTML = (`<summary style="padding: 10px; font-size: 1.5em; font-weight: bolder">Global</summary>`);
    for (let script of cheats.global) {
        let cheat = createButton(script.name);
        cheat.style.backgroundColor = script.type == "toggle" ? script.enabled ? "#4631bd" : "#5941e0" : "hsl(0, 0%, 20%)";
        cheat.onclick = () => {
            try {
                script.run();
            } finally {
                cheat.style.backgroundColor = script.type == "toggle" ? script.enabled ? "#4631bd" : "#5941e0" : "hsl(0, 0%, 20%)";
/* // console.log(script); */
            }
        };
        global.appendChild(cheat);
    }
    global.open = false;
    global.style.paddingBottom = '10px';
    body.appendChild(global);

    let cheatDiv = document.createElement('div');
    body.appendChild(cheatDiv);

    console.log(cheats);
    const setCheats = (curPage) => {
        if (!curPage || !cheats[curPage]) return;
        for (let cheat of cheats[curPage]) {
            let button = createButton(cheat.name);
            button.style.backgroundColor = cheat.type == "toggle" ? cheat.enabled ? "#4631bd" : "#5941e0" : "hsl(0, 0%, 20%)";
            button.onclick = () => {
                try {
                    cheat.run();
                } finally {
                    button.style.backgroundColor = cheat.type == "toggle" ? cheat.enabled ? "#4631bd" : "#5941e0" : "hsl(0, 0%, 20%)";
/* // console.log(cheat); */
                }
            };
            cheatDiv.appendChild(button);
            cheatDiv.appendChild(document.createElement('br'));
        }
    }
    setTimeout(() => setCheats(getSite()), 50);
    var offLocationChange = onLocationChange(pathname => {
        let curPage = getSite();
        curPageEl.innerText = getSite(true) ? `Current gamemode: ${getSite(true)}` : 'No game detected';
        cheatDiv.innerHTML = "";
        setCheats(curPage);
    });

    function onLocationChange(handler) {
        let current = window.location.pathname;
        const interval = setInterval(() => {
            if (window.location.pathname == current) return;
            current = window.location.pathname;
            handler(current);
        }, 50);
        return () => clearInterval(interval);
    }

    function createButton(cheat) {
        let button = document.createElement('button');
        button.classList.add('cheat');
        button.innerText = cheat;
        return button
    }
    function getSite(capitalize) {
        switch (window.location.pathname) {
            case "/play/racing":
                return capitalize ? "Racing" : "racing";
            case "/play/factory":
                return capitalize ? "Factory" : "factory";
            case "/play/classic/get-ready":
            case "/play/classic/question":
            case "/play/classic/answer/sent":
            case "/play/classic/answer/result":
            case "/play/classic/standings":
                return capitalize ? "Classic" : "classic";
            case "/play/battle-royale/match/preview":
            case "/play/battle-royale/question":
            case "/play/battle-royale/answer/sent":
            case "/play/battle-royale/answer/result":
            case "/play/battle-royale/match/result":
                return capitalize ? "Battle Royale" : "royale";
            case "/play/toy":
                return capitalize ? "Santa's Workshop" : "workshop";
            case "/play/gold":
                return capitalize ? "Gold Quest" : "gold";
            case "/play/brawl":
                return capitalize ? "Monster Brawl" : "brawl";
            case "/play/hack":
                return capitalize ? "Crypto Hack" : "hack";
            case "/play/fishing":
                return capitalize ? "Fishing Frenzy" : "fishing";
            case "/play/rush":
                return capitalize ? "Blook Rush" : "rush";
            case "/play/dino":
                return capitalize ? "Deceptive Dinos" : "dino";
            case "/tower/map":
            case "/tower/battle":
            case "/tower/rest":
            case "/tower/risk":
            case "/tower/shop":
            case "/tower/victory":
                return capitalize ? "Tower of Doom" : "doom";
            case "/cafe":
            case "/cafe/shop":
                return capitalize ? "Cafe" : "cafe";
            case "/defense":
                return capitalize ? "Tower Defense" : "defense";
            case "/play/defense2":
                return capitalize ? "Tower Defense 2" : "defense2";
            case "/kingdom":
                return capitalize ? "Crazy Kingdom" : "kingdom";
            default:
                return false;
        }
    };
    function toggleHidden(e) {
        e.code == 'KeyZ' && (GUI.hidden = !GUI.hidden)
    };
    addEventListener('keypress', toggleHidden);
})();