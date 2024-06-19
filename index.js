const express = require('express');
const triggerEraserWorkflow = require('./triggerEraserWorkflow'); // Import the function from triggerEraserWorkflow.
const path = require('path')
const app = express();
const port = 3000; 

app.use(express.json());

app.use(express.static(path.join(__dirname, 'clientApp/dist')))

app.post('/eraser', async (req, res) => {
  const trigger = req.query.trigger || 'none';
  const resourceGroupName = req.query['resource-group-name'] || '';


  const validTriggers = ['none', 'vm-vnet-ez', 'two-vm-vnet'];
  if (!validTriggers.includes(trigger)) {
    res.status(400).send(`Invalid trigger value. Allowed values are: ${validTriggers.join(', ')}`);
    return;
  }

  const result = await triggerEraserWorkflow(trigger, resourceGroupName);
  res.send(result);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'clientApp/dist', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
