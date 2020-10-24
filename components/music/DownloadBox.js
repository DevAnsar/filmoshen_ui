import React , {useState} from 'react';
import Downloader from "js-file-downloader";
import {ProgressBar, Spinner} from 'react-bootstrap';

function DownloadBox({convertInnfo ,mp4Audios,filename,m_loading}) {

    const [downloadingPercentage, setDownloadingPercentage] = useState(0);

    const AccessAudioBitrate=[128,320];
    function musicDownload(fileUrl,bitrate) {

        let fileName=`${filename}_${bitrate}.mp3`;
        console.log('download...');
        new Downloader({
            url: fileUrl,
            process: progress,
            filename:fileName,
            timeout:10000
        }).then(function () {
            console.log('downloaded');
        }).catch(function (error) {
                console.log(error);
                // Called when an error occurred
            });

    }

    function progress (event) {
        if (!event.lengthComputable) return; // guard
        var downloadingPercentage = Math.floor(event.loaded / event.total * 100);
        setDownloadingPercentage(downloadingPercentage);
        console.log('downloadingPercentage',downloadingPercentage);
    };

    return(
        <div className="row bg-light py-3 my-4 justify-content-center">

            {
                m_loading? <>
                        <div className={`col-12 justify-content-center`} style={{textAlign:'center'}}>
                            <Spinner animation="border" variant="secondary" />
                            <span style={{display:'block'}} className={`f7 mt-2 text-secondary`}>در حال دریافت</span>
                        </div>
                    </> :

                        convertInnfo.map((item, index) => {
                        return (
                            AccessAudioBitrate.includes(item.audio_bitrate)?
                                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3  text-center  pb-2">
                                    <a
                                        onClick={() => {
                                            musicDownload(mp4Audios[index],item.audio_bitrate)
                                        }}
                                        className="btn btn-red font-s justify-content-center w-100">
                                        <i className='fas fa-download mr-1 py-1 px-1'/> دانلود با کیفیت
                                        {
                                            item.audio_bitrate
                                        }
                                    </a>
                                </div>
                                :
                                ''
                        )
                    })


            }




            {/*<div className="col-12 text-center mt-2">*/}
            {/*<button type="button" className="btn btn-red font-s"><i*/}
            {/*className='fas fa-download mr-1 py-1 px-1'/>*/}
            {/*دانلود با کیفیت 120*/}
            {/*</button>*/}
            {/*</div>*/}


            <div className='col-12' style={{minHeight:'40px'}}>
                {
                    downloadingPercentage > 0 ?
                        <ProgressBar now={downloadingPercentage} label={`${downloadingPercentage}%`} />
                        :''
                }

            </div>
        </div>
    )
}

export default DownloadBox;