import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [trigger, setTrigger] = useState('none');
  const [resourceGroupName, setResourceGroupName] = useState('');

  const handleEraserSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/eraser', { trigger, resourceGroupName });
      alert(response.data);
    } catch (error) {
      alert('Error dispatching workflow');
    }
  };

  return (
    <form onSubmit={handleEraserSubmit}>
      <div>
        <label>
          Trigger:
          <select value={trigger} onChange={(e) => setTrigger(e.target.value)}>
            <option value="none">None</option>
            <option value="vm-vnet-ez">VM VNet EZ</option>
            <option value="two-vm-vnet">Two VM VNet</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Resource Group Name:
          <input
            type="text"
            value={resourceGroupName}
            onChange={(e) => setResourceGroupName(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
