require('dotenv').config();
const axios = require('axios');

const { GITHUB_OWNER, GITHUB_REPO, GITHUB_WORKFLOW_ID, GITHUB_TOKEN } = process.env;

const triggerEraserWorkflow = async (trigger, resourceGroupName) => {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${GITHUB_WORKFLOW_ID}/dispatches`;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${GITHUB_TOKEN}`
  };
  const data = {
    ref: 'main',
    inputs: {
      trigger: trigger || 'none',
      'resource-group-name': resourceGroupName || ''
    }
  };

  try {
    const response = await axios.post(url, data, { headers });
    if (response.status === 204) {
      console.log('Workflow dispatched successfully!');
      return 'Workflow dispatched successfully!';
    } else {
      console.error(`Failed to dispatch workflow: ${response.status}`);
      console.error(response.data);
      return `Failed to dispatch workflow: ${response.status}`;
    }
  } catch (error) {
    console.error('Error dispatching workflow:', error.response ? error.response.data : error.message);
    return 'Error dispatching workflow.';
  }
};

module.exports = triggerEraserWorkflow;
