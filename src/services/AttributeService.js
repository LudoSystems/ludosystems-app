import axios from "axios";
import authHeader from "./authHeader";

const API_ATTRIBUTES = process.env.REACT_APP_API_URI + "attributes/"

const API_ATTRIBUTES_TEXT = API_ATTRIBUTES + "text/"
const API_ATTRIBUTES_NUMBER = API_ATTRIBUTES + "number/"
    
const AttributeService = {

    updateTextAttribute: async (id, name, text) => {
        return await axios.patch(API_ATTRIBUTES_TEXT + id, {            
                name: name,
                text: text
        }, {
            headers: authHeader(),
        });
    },

    updateNumberAttribute: async (id, name, number) => {
        return await axios.patch(API_ATTRIBUTES_NUMBER + id, {            
                name: name,
                number: number
        }, {
            headers: authHeader(),
        });
    },
    
    addAttribute: async (attribute) => {
        return await axios.post(API_ATTRIBUTES + "add", attribute, { headers: authHeader() });
    },

    deleteAttribute: async (id) => {
        return await axios.delete(API_ATTRIBUTES + id, { headers: authHeader() });
    },

    updateAttributeOrder: async (id, sortOrder) => {
        const headers = authHeader();
    
        headers['Content-Type'] = 'application/json';
   
        return await axios.patch(API_ATTRIBUTES + 'order/' + id, sortOrder, {headers: authHeader()});
    },
}

export default AttributeService;