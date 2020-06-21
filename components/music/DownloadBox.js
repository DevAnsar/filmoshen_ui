import React , {useState} from 'react';
import Downloader from "js-file-downloader";
import { ProgressBar} from 'react-bootstrap';

function DownloadBox({convertInnfo ,mp4Audios,filename}) {

    const [downloadingPercentage, setDownloadingPercentage] = useState(0);
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
        <div className="row bg-light py-3 my-4">


            {
                convertInnfo.map((item, index) => {

                    return (
                        <div key={index} className="col-3  text-center  pb-2">
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