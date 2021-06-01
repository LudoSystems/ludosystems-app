import axios from "axios";
import authHeader from "./authHeader";

const API_NODES = process.env.REACT_APP_API_URI + "nodes/"

const NodeService = {
    getNodes: () => {
        return axios.get(API_NODES, { headers: authHeader() });
    },

    getRoots: () => {
        return axios.get(API_NODES + "roots", { headers: authHeader() });
    },

    exportJson: () => {
        return axios.get(API_NODES + "export-json", { headers: authHeader(), responseType: 'blob' });
    },

    getNode: (id) => {
        return axios.get(API_NODES + id, { headers: authHeader() });
    },

    addNode: async (node) => {
        return await axios.post(API_NODES + "add", node, { headers: authHeader() });
    },

    deleteNode: async (id) => {
        return await axios.delete(API_NODES + id, { headers: authHeader() });
    },

    updateNodePosition: async (id, posX, posY) => {
        return await axios.patch(API_NODES + 'address/' + id, {            
                posX: posX,
                posY: posY
        }, {
            headers: authHeader(),
        });
    },

    connectNodes: async (id, childId) => {
        // If only a Long is passed, axios sets the MIME type to application/x-www-form-urlencoded but the API expects application/json.
        const headers = authHeader();
    
        headers['Content-Type'] = 'application/json';
   
        return await axios.patch(API_NODES + 'connect/' + id, childId, { headers: headers });
    },

    disconnectNodes: async (id, childId) => {
        const headers = authHeader();
    
        headers['Content-Type'] = 'application/json';
   
        return await axios.patch(API_NODES + 'disconnect/' + id, childId, { headers: headers });
    }
}

export default NodeService;