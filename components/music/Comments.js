import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import * as reboot from "../../style/reboot.module.css";
import ToastsAlert from "../ToastsAlert";

const Line = () => {
    return (
        <div className="progress" style={{height: '1px', backgroundColor: '#cccccc'}}>
            <div className="progress-bar"/>
        </div>
    )
};

function Comment({comment}) {

    // 0 => default
    // 1 => liked
    // -1 => disliked
    const [likeStatus, setLikeStatus] = useState(comment.auth_user_has_liked);
    const [likeCount, setLikeCount] = useState(comment.likeCount);
    const [dislikeCount, setDisLikeCount] = useState(comment.dislikeCount);

    function handleLike(comment_id) {

        // console.log(comment_id);
        axios.get(`/api/like/${comment_id}/like`).then(res => {
            console.log('like', res.data.like_status);
            let newLikeStatus = res.data.like_status;
            let comment = res.data.comment;
            setLikeStatus(newLikeStatus);
            setLikeCount(comment.likeCount);
            setDisLikeCount(comment.dislikeCount);
        }).catch(err => console.log(err))
    }

    function handleDisLike(comment_id) {

        // console.log(comment_id)
        axios.get(`/api/like/${comment_id}/dislike`).then(res => {
            console.log('dislike', res.data.like_status);
            let newLikeStatus = res.data.like_status;
            let comment = res.data.comment;
            setLikeStatus(newLikeStatus);
            setLikeCount(comment.likeCount);
            setDisLikeCount(comment.dislikeCount);
        }).catch(err => console.log(err))
    }

    return (
        <>
            <div className="row py-2 px-2 ">
                <div className="col-2 col-md-2 col-lg-2 mt-2">
                    <img src="/img/man%20(3).png" className="img-fluid d-block mx-lg-0 mx-md-0 mx-auto"/>
                </div>
                <div className="col-7 col-md-5 col-lg-7 mt-2">
                    <p className="font-s pt-xl-1 pt-md-1 pt-2">
                            <span className="ml-3">
                                {
                                    comment.user_name
                                }
                            </span>
                        <span className="ml-3 f6" style={{display: 'inline-block', color: '#b2b2b2'}}>
                            {
                                comment?.created_at
                            }
                         </span>
                    </p>
                    <p className="font-s pt-xl-4 pt-lg-3 pt-md-4 pt-4">
                        {
                            comment.comment
                        }
                    </p>
                </div>
                <div className="col-12 col-md-4 col-lg-3 mt-2">
                    <div className="row mx-0">

                        {/*liked*/}
                        <p className={`pt-4 font-s like ${likeStatus === 1 ? 'liked' : ''}`}>
                                <span className='like-count p-1'>
                                    {
                                        likeCount
                                    }
                                    +
                                </span>
                            <span className="svg-icon-wrapper is-icon-thumbs-up-new ">
                                        <svg
                                            onClick={() => handleLike(comment.id)}
                                            version="1.1" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}}
                                            viewBox="0 0 32 32">

                                        <path
                                            d="M17.497 3.604l-7.54 7.54a2.72 2.72 0 0 0-.79 1.92v13.598a2.73 2.73 0 0 0 2.722 2.722h12.25a2.741 2.741 0 0 0 2.505-1.647l4.437-10.358c1.143-2.695-.83-5.69-3.757-5.69h-7.69l1.293-6.234a2.052 2.052 0 0 0-.558-1.865 2.025 2.025 0 0 0-2.872.014zM3.722 29.384a2.73 2.73 0 0 0 2.723-2.722v-10.89a2.73 2.73 0 0 0-2.723-2.722A2.73 2.73 0 0 0 1 15.772v10.89a2.73 2.73 0 0 0 2.722 2.722z"
                                            id="icon-thumbs-up-new"></path>

                                </svg>
                                </span>
                            {/*<i className='far fa-thumbs-down mr-1 text-danger'/>*/}
                        </p>

                        {/*disliked*/}
                        <p className={`pt-4 font-s mr-4 dislike ${likeStatus === -1 ? 'disliked' : ''}`}>
                                <span className='dislike-count p-1'>
                                {
                                    dislikeCount
                                }
                                    -
                                </span>

                            <span className="svg-icon-wrapper is-icon-thumbs-down-new ">
                                    <svg

                                        onClick={() => handleDisLike(comment.id)}
                                        version="1.1" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}}
                                        viewBox="0 0 32 32">
                                        <path
                                            d="M14.906 28.78l7.527-7.54a2.72 2.72 0 0 0 .79-1.92V5.722A2.73 2.73 0 0 0 20.5 3H8.264a2.708 2.708 0 0 0-2.49 1.647L1.335 15.005c-1.157 2.695.817 5.69 3.743 5.69h7.69l-1.293 6.234c-.136.68.068 1.374.558 1.864.803.79 2.083.79 2.872-.013zM28.681 3a2.73 2.73 0 0 0-2.722 2.722v10.89a2.73 2.73 0 0 0 2.722 2.722 2.73 2.73 0 0 0 2.722-2.723V5.722A2.73 2.73 0 0 0 28.681 3z"
                                            id="icon-thumbs-down-new"></path>
                                    </svg>
                                </span>
                            {/*<i className='far fa-thumbs-up mr-1 text-success'/>*/}
                        </p>
                    </div>
                </div>
            </div>
            <Line/>
        </>
    )
}

function Comments({music, isAuthenticated, type, comments}) {

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('#fd3746');

    console.log('movie comments',comments);
    const [Comments, SetComments] = useState(comments);
    const [userComment, SetUserComment] = useState('');

    let commentMessageTimeOut;
    useEffect(()=>{
        SetComments(comments)
    },[comments]);
    const handleSendComment = async () => {
        console.log('movie_type', music.id);

        if (commentValidator()) {
            await axios.get(`/api/send/comment`, {
                params: {
                    comment: userComment,
                    movie_id: music.id,
                    movie_type: type
                }

            })
                .then(response => {
                    console.log('comment', response.data);
                    if (response.data.status) {
                        let {comment} = response.data;
                        SetComments(prev_comments => {
                            return [
                                ...prev_comments,
                                {
                                    user_name: comment.user_name,
                                    user_avatar: comment.user_avatar,
                                    comment: comment.comment,
                                    likeCount: comment.likeCount,
                                    dislikeCount: comment.dislikeCount,
                                }
                            ]

                        });
                    }

                    setAlertMessage('کامنت ارسال شد.بعد از تایید منتشر خواهد شد');
                    setAlertColor('#35fd5a');
                    setAlert(true);
                    alertTimeOutHandle();

                    SetUserComment('');
                })
                .catch(err =>{

                    setAlertMessage('مشکل در برقراری ارتباط');
                    setAlertColor('#fd3746');
                    setAlert(true);
                    alertTimeOutHandle();

                    console.log(err)
                });


        }
    };



    function commentValidator() {
        if (!isAuthenticated) {

            setAlertMessage('برای ارسال کامنت حتما باید وارد سایت شوید');
            setAlertColor('#fd3746');
            setAlert(true);
            alertTimeOutHandle();

            return false;
        } else {
            if (userComment.length === 0) {

                setAlertMessage(' متن کامنت را وارد کنید');
                setAlertColor('#fd3746');
                setAlert(true);
                alertTimeOutHandle();

                return false;

            } else if (userComment.length <= 5) {

                setAlertMessage(' متن کامنت باید بشتر از 5 کاراکتر باشد ');
                setAlertColor('#fd3746');
                setAlert(true);
                alertTimeOutHandle();

                return false;

            } else {
                return true;
            }
        }
    }


    function alertTimeOutHandle() {
        clearTimeout(commentMessageTimeOut);
        commentMessageTimeOut =setTimeout(() => {
            setAlert(false);
        }, 4000);
    }
    return (
        <>
            <ToastsAlert alert_show={alert} message={alertMessage} color={alertColor}/>
            <div className="container mt-xl-5 mt-md-4 mt-3 pt-3 pb-5 ">

                <div className="row py-2 mx-0">
                    <h6>
                        {`نظرات آهنگ  `}
                        {music?.title}
                    </h6>
                </div>

                {
                    isAuthenticated ?
                        <form className="profile">
                            <div className="row pt-4 pb-4">
                                <div className="col-12">

                                    <div className={`input-group mb-3 mt-0 ${reboot.rtl}`}>

                                        <input style={{height: '45px'}}
                                               className="form-control font-md"
                                               placeholder="این آهنگ چطور بود؟"
                                               onChange={(e) => {
                                                   SetUserComment(e.target.value)
                                               }}
                                               value={userComment}
                                        />
                                        <div className="input-group-prepend input-group-prepend2" id='send-comment-button'>
                                    <span className="input-group-text input-group-text2">
                                        <svg
                                            onClick={() =>handleSendComment() }
                                            version="1.1" xmlns="http://www.w3.org/2000/svg" style={{}}
                                            viewBox="0 0 32 32">
                                            <path d="M.848 29.75L31.75 16.5.848 3.25.833 13.556 22.917 16.5.833 19.444z"
                                                  id="icon-send"/>
                                        </svg>
                                    </span>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </form>
                        :
                        <div className='alert alert-success'>
                            برای ارسال کامنت باید وارد اکانت کاربری خود شوید
                        </div>
                }

                <div className="border bg-white rounded comment-list">
                    {
                        Comments?.map(comment => <Comment key={comment.id} comment={comment}/>)
                    }
                </div>
            </div>

        </>
    )
}

export default Comments;