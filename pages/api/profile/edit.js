import axios from "axios/index";

const edit = async (req, res) => {
    await  axios.post(`${process.env.BaseUrl}/api/site/profile/edit?api_token=${req.cookies.token}`, {
        name: req.query.name,
        email: req.query.email,
    })
        .then(response => {
            res.json({
                status: response.data.status
            })
        })
        .catch(err => console.log(err))

};

export default edit;