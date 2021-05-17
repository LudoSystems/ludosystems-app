import axios from "axios";
import authHeader from "./authHeader";

const API = "http://localhost:8080/";
const API_NODES = API + "nodes/"

const NodeService = {
    getNodes: () => {
        return axios.get(API_NODES, { headers: authHeader() });
    },

    getRoots: () => {
        return axios.get(API_NODES + "roots", { headers: authHeader() });
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

    updateNodePosition: async (node) => {
        return await axios.patch(API_NODES + 'address/' + node.id, {            
                posX: node.position.x,
                posY: node.position.y
        }, {
            headers: authHeader(),
        });
    },
}

export default NodeService;