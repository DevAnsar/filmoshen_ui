import React from 'react';
import ReactHLS from 'react-hls-player';

// In your render function



function PlayerPage({url}) {

    return (
            <ReactHLS url={url}
                      width='100%'
            />
    )
}

export default PlayerPage;