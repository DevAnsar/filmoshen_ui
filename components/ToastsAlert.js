import React, {useState,useEffect} from 'react';
import { Col, Row, Toast} from 'react-bootstrap';

function ToastsAlert({alert_show , message ,color}) {

    const [show, setShow] = useState(alert_show);

    useEffect(()=>{
        setShow(alert_show);
    },[alert_show]);
    return (
        <>
            <Row style={{position:'fixed',left:'20px',bottom:'20px',zIndex:10000}}>
                <Col xs={12}>
                    {/*onClose={() => setShow(false)}*/}
                    <Toast  show={show} style={{backgroundColor:color}}>
                        <Toast.Header>
                            {/*<img*/}
                                {/*src="holder.js/20x20?text=%20"*/}
                                {/*className="rounded mr-2"*/}
                                {/*alt=""*/}
                            {/*/>*/}
                            <strong className="mr-auto">
                                {
                                    process.env.AppName
                                }
                            </strong>
                            {/*<small>11 mins ago</small>*/}
                        </Toast.Header>
                        <Toast.Body>
                            {message}
                        </Toast.Body>
                    </Toast>
                </Col>
                {/*<Col xs={6}>*/}
                    {/*<Button onClick={() => setShow(true)}>Show Toast</Button>*/}
                {/*</Col>*/}
            </Row>
        </>
    )
}

export default ToastsAlert;