import React from 'react';

export default function UploadedImage({src, id, removeHandler}) {
    return(
        <img src={src} className="uploaded-image" alt="Uploaded" id={id} onClick={removeHandler}/>
    )
}