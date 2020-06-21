import React ,{useState ,useEffect} from 'react';
import Layout from "../Layout";
import {Form , Col } from 'react-bootstrap'
import axios from 'axios';
import { connect } from 'react-redux';


function ProfileEdit({user,token}) {
    const [alert,setAlert]=useState(false);
    const [name,setName]=useState(user.name);
    const [family,setFamily]=useState(null);
    const [email,setEmail]=useState(user.email);

    // useEffect(()=>{
    //     setName(user.name);
    //     setEmail(user.email);
    // },[]);



    function  handleProfileEdit(e){
        e.preventDefault();
        console.log('name',name)
        axios.post(`${process.env.BaseUrl}/api/site/profile/edit?api_token=${token}`,{
            name,email
        }).then(res=>{
            console.log(res);
            setAlert(true)
        }).catch(err=>console.log(err))
    };

    return(
        <Layout user={user}>
            <Col sm={12}>
                <Form>
                    <Form.Row>
                        <Col  xs={12} md={6} lg={3}>
                            <Form.Label>
                                نام
                            </Form.Label>
                            <Form.Control
                                onChange={e=>setName(e.target.value)}
                                placeholder="نام" value={name} />
                        </Col>
                        <Col  xs={12} md={6} lg={3} >
                            <Form.Label>
                                نام خانوادگی
                            </Form.Label>
                            <Form.Control placeholder="نام خانوادگی" />
                        </Col>
                        <Col  xs={12} md={6} lg={3} >
                            <Form.Label>
                                ایمیل
                            </Form.Label>
                            <Form.Control
                                onChange={e=>setEmail(e.target.value)}
                                placeholder="ایمیل"  value={email}/>
                        </Col>
                        <Col  xs={12} md={12} lg={12} className={`mt-4`} >
                            <button onClick={handleProfileEdit.bind(this)} className={`btn btn-warning f7`}> ویرایش</button>
                        </Col>
                    </Form.Row>
                </Form>
            </Col>

        </Layout>
    )
}
ProfileEdit.getInitialProps= ctx => {

    return{

    }
};

const mapStateToProps = (state) => (
    {token: state.authentication.token}
);

export  default connect(mapStateToProps)(ProfileEdit);