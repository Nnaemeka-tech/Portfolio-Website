const fs = require('fs');

async function run() {
    const currentReq = await fetch("http://localhost:5678/api/v1/workflows/0JTwv2s1ShlmWO2y", {
        headers: {
            "X-N8N-API-KEY": "n8n_api_8849ac1ae1c0a00d8ccba16cdd507fd22f07a78ef3a78917e35b0d0c64eb3074ece4bdf838de36e5200ecda2aede4803"
        }
    });

    const wf = await currentReq.json();

    // Wire IF Parent
    // True (0) goes to CreateParentFolder
    // False (1) goes straight to SetParentId
    wf.connections.IfParentExists = {
        main: [
            [{ node: "CreateParentFolder", type: "main", index: 0 }],
            [{ node: "SetParentId", type: "main", index: 0 }]
        ]
    };

    // Wire IF Scene
    // True (0) goes to CreateSceneFolder
    // False (1) goes straight to SetSceneId
    wf.connections.IfSceneExists = {
        main: [
            [{ node: "CreateSceneFolder", type: "main", index: 0 }],
            [{ node: "SetSceneId", type: "main", index: 0 }]
        ]
    };

    fs.writeFileSync('C:\\Users\\Nnaemeka\\Desktop\\Nnaemeka Website\\full_if_fix.json', JSON.stringify(wf, null, 2));
}

run();
