const fs = require('fs');
const workflowJson = JSON.parse(fs.readFileSync('C:\\Users\\Nnaemeka\\.gemini\\antigravity\\brain\\9c5ccf9b-dede-490a-ac04-d573eb881b5b\\.system_generated\\steps\\668\\output.txt', 'utf8'));
const workflow = workflowJson.data;

const mergeNode = workflow.nodes.find(n => n.name === 'MergeAssets');
mergeNode.parameters = {
    mode: 'combine',
    combinationMode: 'append',
    options: {}
};
mergeNode.position = [1600, 0];

const gdriveNode = workflow.nodes.find(n => n.name === 'GoogleDrive');
gdriveNode.position = [1800, 0];
gdriveNode.parameters.fileName = "={{$('ParseScenes').item.json.title}}_Scene_{{$('LoopScenes').item.json.sceneNumber}}";

const downloadNode = {
    id: "node-download-image",
    name: "DownloadImage",
    type: "n8n-nodes-base.httpRequest",
    typeVersion: 4.4,
    position: [1400, 112],
    parameters: {
        url: "={{$json.generations[0].generated_images[0].url}}",
        method: "GET",
        authentication: "none",
        options: {
            response: {
                response: {
                    responseFormat: "file"
                }
            }
        }
    }
};
workflow.nodes.push(downloadNode);

// Update connections
workflow.connections['LeonardoGET'] = {
    main: [
        [
            {
                node: "DownloadImage",
                type: "main",
                index: 0
            }
        ]
    ]
};

workflow.connections['DownloadImage'] = {
    main: [
        [
            {
                node: "MergeAssets",
                type: "main",
                index: 1
            }
        ]
    ]
};

fs.writeFileSync('C:\\Users\\Nnaemeka\\Desktop\\Nnaemeka Website\\fixed_workflow.json', JSON.stringify({
    id: workflow.id,
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections
}, null, 2));
console.log("Written fixed workflow!");
