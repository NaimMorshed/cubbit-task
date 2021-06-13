import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

const ReactDropzone = () => {

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className="App-header">
            <div className="bg-info border w-50 center-row" {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </div>
    );
};

export default ReactDropzone;