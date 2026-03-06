const fs = require('fs');

try {
    const raw = fs.readFileSync('C:\\Users\\Nnaemeka\\.gemini\\antigravity\\brain\\9c5ccf9b-dede-490a-ac04-d573eb881b5b\\.system_generated\\steps\\788\\output.txt', 'utf8');
    const data = JSON.parse(raw);
    const wf = data.data;

    // 1. Find or Create UploadLoop
    let uploadNode = wf.nodes.find(n => n.name === 'UploadLoop');
    if (!uploadNode) {
        uploadNode = {
            parameters: { options: {} },
            id: "node-upload-loop",
            name: "UploadLoop",
            type: "n8n-nodes-base.splitInBatches",
            typeVersion: 3,
            position: [1800, 0]
        };
        wf.nodes.push(uploadNode);
    }

    // 2. Update MergeAssets
    const mergeNode = wf.nodes.find(n => n.name === 'MergeAssets');
    mergeNode.parameters = { mode: "combine", combinationMode: "multiplex", options: {} };

    // 3. Update GoogleDrive
    const gDriveNode = wf.nodes.find(n => n.name === 'GoogleDrive');
    gDriveNode.parameters.fileName = "={{ $('ParseScenes').item.json.title }}_Scene_{{ $('LoopScenes').item.json.sceneNumber }}.{{ $binary.data.fileExtension || 'Asset' }}";
    gDriveNode.position = [2000, 0];

    // 4. Update Connections
    // Route Merge -> UploadLoop
    wf.connections.MergeAssets = {
        main: [[{ node: "UploadLoop", type: "main", index: 0 }]]
    };

    // Route UploadLoop -> GoogleDrive AND LoopScenes
    wf.connections.UploadLoop = {
        main: [
            [
                { node: "GoogleDrive", type: "main", index: 0 },
                { node: "LoopScenes", type: "main", index: 0 }
            ]
        ]
    };

    // Route GoogleDrive -> UploadLoop
    wf.connections.GoogleDrive = {
        main: [[{ node: "UploadLoop", type: "main", index: 0 }]]
    };

    fs.writeFileSync('C:\\Users\\Nnaemeka\\Desktop\\Nnaemeka Website\\full_upload_fix.json', JSON.stringify({
        id: wf.id,
        name: wf.name,
        nodes: wf.nodes,
        connections: wf.connections
    }, null, 2));

    console.log("SUCCESS");
} catch (e) {
    console.error(e);
}
