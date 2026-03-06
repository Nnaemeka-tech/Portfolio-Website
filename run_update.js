const fs = require('fs');
const workflow = JSON.parse(fs.readFileSync('fixed_workflow.json', 'utf8'));
fs.writeFileSync('update_payload.json', JSON.stringify({
    id: workflow.id,
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections
}, null, 2));
