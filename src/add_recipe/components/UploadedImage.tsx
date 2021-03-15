import React from 'react';

export default function UploadedImage({src, id, removeHandler} : 
        {src: string, id: number, removeHandler: (event: React.MouseEvent<HTMLImageElement>) => void}) {
    return(
        <img src={src} className="uploaded-image" alt="Uploaded" id={id.toString()} onClick={removeHandler}/>
    )
}