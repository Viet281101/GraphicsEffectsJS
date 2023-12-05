
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 1280 / 2;
const CANVAS_HEIGHT = canvas.height = 960 / 2;

canvas.style.position = 'absolute';
canvas.style.left = (window.innerWidth - CANVAS_WIDTH) / 2 + 'px';
canvas.style.top = (window.innerHeight - CANVAS_HEIGHT) / 2 + 'px';


const imgInfo = {
    "state": {
        "attack-A": {
            "src": "./assets/Attacks/attack-A",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 7
        },
        "attack-B": {
            "src": "./assets/Attacks/attack-B",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 6
        },
        "attack-C": {
            "src": "./assets/Attacks/attack-C",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 7
        },
        "attack-D": {
            "src": "./assets/Attacks/attack-D",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 9
        },
        "jump-attack": {
            "src": "./assets/Attacks/jump-attack-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 5
        },
        "kick": {
            "src": "./assets/Attacks/kick-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 4
        },

        "climb": {
            "src": "./assets/Climb/climb-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 16
        },

        "dead": {
            "src": "./assets/Dead/dead-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 6
        },

        "hit-idle-A": {
            "src": "./assets/Hit/hit-idle-A",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 4
        },
        "hit-idle-B": {
            "src": "./assets/Hit/hit-idle-B",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 4
        },
        "hit-with-weapon-A": {
            "src": "./assets/Hit/hit-with-weapon-A",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 4
        },
        "hit-with-weapon-B": {
            "src": "./assets/Hit/hit-with-weapon-B",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 4
        },

        "idle": {
            "src": "./assets/Idle/idle-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 6
        },
        "idle-with-weapon": {
            "src": "./assets/Idle/idle-with-weapon-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 6
        },

        "jump": {
            "src": "./assets/Jump/jump-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 14
        },

        "roll": {
            "src": "./assets/Roll/roll-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 14
        },

        "run": {
            "src": "./assets/Run/run-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 12
        },

        "shield-block-active": {
            "src": "./assets/ShieldBlock/shield-block-activ-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 2
        },
        "shield-block-center": {
            "src": "./assets/ShieldBlock/shield-block-center-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 2
        },
        "shield-block-up": {
            "src": "./assets/ShieldBlock/shield-block-up-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 2
        },

        "walk": {
            "src": "./assets/Walk/walk",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 11
        },

        "walk-with-weapon": {
            "src": "./assets/WalkWeapon/walk-with-weapon-",
            "rotated": false,
            "sourceSize": {"w": 128, "h": 96},
            "frames": 11
        }, 
        "stop": {
            "sourceSize": {"w": 128, "h": 96},
            "frames": 0,
        }
    }
};


const buttonsContainer = document.getElementById('buttons-container');


let characterState = {
    name: '',
    frames: 0,
};
let characterImage;
let characterFrame = 0;
let characterStagger = 0;
const characterStaggerFrame = 5;
let animationRequestId;


function loadCharacterState(stateName) {
    if (animationRequestId) {
        cancelAnimationFrame(animationRequestId);
    }
    
    if (imgInfo.state[stateName]) {
        characterState.name = stateName;
        characterState.frames = imgInfo.state[stateName].frames;
        characterImage = new Image();
        ctx.imageSmoothingEnabled = false;
        characterImage.src = `${imgInfo.state[stateName].src}0.png`; 
        characterFrame = 0;
        characterStagger = 0;
    }else if (stateName === 'stop') {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        characterState.name = stateName;
        characterState.frames = imgInfo.state[stateName].frames;
        characterFrame = 0;
        characterStagger = 0;
    }
};



function drawCharacterFrame() {
    if ((characterStagger % characterStaggerFrame) === 0) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(characterImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        characterFrame = (characterFrame + 1) % characterState.frames;
        characterImage.src = `${imgInfo.state[characterState.name].src}${characterFrame}.png`;

        if (characterFrame === 0) {
            characterImage.src = `${imgInfo.state[characterState.name].src}${characterFrame}.png`;
        }
    }
    characterStagger++;
    animationRequestId = requestAnimationFrame(drawCharacterFrame);
};


function startCharacterAnimation() {
    if (characterState.name) {
        animationRequestId = requestAnimationFrame(drawCharacterFrame);
    }
};


for (const stateName in imgInfo.state) {
    const button = document.createElement('button');
    button.textContent = stateName;
    button.addEventListener('click', () => {
        loadCharacterState(stateName);
        startCharacterAnimation();
    });
    buttonsContainer.appendChild(button);
};


let gui = new dat.GUI();
let stateController = gui.addFolder('State');
stateController.add(characterState, 'name', Object.keys(imgInfo.state));
stateController.open();

