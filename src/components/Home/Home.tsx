import React, { useState } from 'react';
import './Home.css';
import firebase from 'firebase/app';
import 'firebase/storage';
import firebaseConfig from '../../firebase.config';
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
else firebase.app();
const storage = firebase.storage();

const Screen = () => {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleFile = (event: any) => {
        event.preventDefault();
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
        } else {
            alert("Please select file")
        }
    }

    const submit = (event: any) => {
        event.preventDefault();
        const uploadTask = storage.ref(file.name).put(file);
        uploadTask.on(
            'state_changed',
            (snapshot: any) => setProgress(1),
            (error: any) => alert(error),
            () => {
                storage
                    .ref(file.name)
                    .getDownloadURL()
                    .then((url: any) => {
                        setProgress(0);
                        setUrl(url);
                        setFile(null);
                    })
            }
        )
    }

    const download = () => {
        if (url) {

        } else {
            alert("select file first")
        }
    }

    return (
        <div className="App">
            <div className="App-header">
                <h2>'4!!(3=s 4+3</h2>
                <span className="below-h2 mt-4 mb-5">
                    ^#5 -"$#=.-+(-$=%(+$=$-"18/3(.-= -#=#$"18/3(.-K=p$"41$= -8=%(+$=38/$= -#=, (-3 (-=8.41=/1(5 "8{'>'}
                </span>
                <form onSubmit={submit}>
                    <div className="yellow-div mb-5">
                        <div>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input" id="validatedCustomFile"
                                    onChange={handleFile}
                                    required />
                                <label className="custom-file-label" htmlFor="validatedCustomFile">
                                    {file === null ? "Choose file..." : file.name}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="button-div center-row">
                        <button type="submit" className="encrypt-button">Encrypt and upload</button>
                        <button onClick={download} className="decrypt-button">Download and decrypt</button>
                    </div>
                    <br />
                    {progress === 0 || "File uploading..."}
                    <small>{url === null || url}</small>
                </form>
            </div>
        </div>
    );
};

export default Screen;