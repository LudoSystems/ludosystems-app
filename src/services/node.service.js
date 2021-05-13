import axios from "axios";
import authHeader from "./auth-header";

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

    // TODO need "remove node" actions

    //TODO this doesn't work at all
    updateNode: (node) => {
        return axios.patch(API_NODES, {
            headers: authHeader(),
            id: node.id,
            node: {
                posX: node.position.x,
                posY: node.position.y
            }
        }).then((response) => {
            // if(response.data) {
                console.log(response)
            // }
            return response.data;
        });
    },
}

export default NodeService;