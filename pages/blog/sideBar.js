import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function sideBar() {

    return(
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="نظر ها">
                <>

                    <div className="row my-3">
                        <div className="col-7 col-md-8">
                            <p>علی احمدی</p>
                            <p>سلام من دو بار اومدم متاسفانه هوا و فضا خیلی سرد بود و...</p>
                        </div>
                        <div className="col-5 col-md-4">
                            <img src="img/51.jpg" className="img-fluid d-block mx-auto"
                                 style={{width: '70px', height: ' 70px', borderRadius: '50%'}}/>
                        </div>
                    </div>

                </>
            </Tab>
            <Tab eventKey="profile" title="بهترین ها">

                <>

                    <div className="row">
                        <div className="col-12 col-md-12">
                            <div className="row pt-2">
                                <div className="col-7">
                                    <a href="#">
                                        <p className="text-justify text-dark"
                                           style={{lineHeight: '1.5'}}>
                                            لیست کامل استخرهای شمال
                                            تهران + آدرس، قیمت و تخفیف بلیط استخر شمال تهران
                                        </p>
                                    </a>
                                    <p className="font text-secondary font-ss pt-1">
                                        <i className="fa fa-clock mx-1 text-secondary"/>
                                        >شنبه 27 مهر
                                    </p>
                                </div>
                                <div className="col-5">
                                    <a href="#">
                                        <img src="img/201.jpg"
                                             className="img-weblog img-fluid d-block mx-auto"/>
                                    </a>
                                </div>
                            </div>
                            {/*//*/}
                        </div>
                    </div>

                </>
            </Tab>
            <Tab eventKey="contact" title="تازه ها">

                <>

                    <div className="row pt-2">
                        <div className="col-7">
                            <a href="#">
                                <p className="text-justify text-dark"
                                   style={{lineHeight: '1.5'}}>لیست
                                    کامل استخرهای شمال تهران + آدرس، قیمت و تخفیف بلیط استخر
                                    شمال
                                    تهران</p>
                            </a>
                            <p className="font text-secondary font-ss pt-1">
                                <i className="fa fa-clock mx-1 text-secondary"/>
                                شنبه 27 مهر
                            </p>
                        </div>
                        <div className="col-5">
                            <a href="#">
                                <img src="img/201.jpg"
                                     className="img-weblog img-fluid d-block mx-auto"/>
                            </a>
                        </div>
                    </div>

                </>
            </Tab>
        </Tabs>
    )
}
export default sideBar;