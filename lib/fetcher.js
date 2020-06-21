import axios from "axios";

function fetcher(...args) {
    return axios(...args).then(response => response.data);
}

export default fetcher;

// import fetch from "isomorphic-unfetch";
//
// function fetcher(...args) {
//     return fetch(...args).then(response => response.json());
// }
//
// export default fetcher;