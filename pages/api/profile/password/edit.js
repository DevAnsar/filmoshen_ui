import axios from "axios/index";

const edit = async (req, res) => {
    await  axios.post(`${process.env.BaseUrl}/api/site/profile/password/edit?api_token=${req.cookies.token}`, {
        password: req.query.password,
    })
        .then(response => {
            res.json({
                status: response.data.status
            })
        })
        .catch(err => console.log(err))

};

export default edit;