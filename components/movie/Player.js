import React from 'react';
import ReactHLS from 'react-hls-player';

// In your render function


function PlayerPage({url}) {

    return (
        <>
            <ReactHLS url={url} width="100%" height="500px" controls />
            {/*<video width="100%" height="500px" controls>*/}
                {/*<source src={url} />*/}
                {/*/!*<source src="movie.ogg" type="video/ogg"/>*!/*/}
            {/*</video>*/}
        </>
    )
}

export default PlayerPage;