import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone'
import './Home.css';
import fileSVG from './files.svg';
import firebase from 'firebase/app';
import 'firebase/storage';
import firebaseConfig from '../../firebase.config';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import uuid from 'react-uuid'
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
else firebase.app();
const storage = firebase.storage();

const Screen = () => {
    const [compData, setCompData] = useContext(UserContext);
    //const [uid, setUid] = useState(null);
    const [file, setFile] = useState([]);
    const [progress, setProgress] = useState(0);
    const history = useHistory();
    const uid = uuid();

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const encrypt = (name: string) => {
        let nameArray: any[] = name.split("");
        for (let i: number = 0; i < nameArray.length; i++) {
            const tempChar: string = nameArray[i];
            nameArray[i] = String.fromCharCode(tempChar.charCodeAt(0) + nameArray.length);
        }
        const finalString: string = nameArray.join("");
        return finalString;
    }

    const submit = (event: any) => {
        event.preventDefault();
        if (file.length > 0) {
            const uploadTask = storage.ref(file[0].name).put(file[0]);
            uploadTask.on(
                'state_changed',
                (snapshot: any) => setProgress(1),
                (error: any) => alert(error),
                () => {
                    storage
                        .ref(file[0].name)
                        .getDownloadURL()
                        .then((url: any) => {
                            setProgress(2);
                            // send to mongoDB
                            fetch('https://safe-beach-70812.herokuapp.com/addData', {
                                method: 'POST',
                                headers: { 'Content-type': 'application/json' },
                                body: JSON.stringify([{
                                    name: file[0].name,
                                    size: file[0].size,
                                    mime: file[0].type,
                                    uuid: uid,
                                    encryption: encrypt(file[0].name),
                                    url: url,
                                }])
                            })
                                .then(res => res.json())
                                .then(data => {
                                    setProgress(0);
                                    setCompData({
                                        name: file[0].name,
                                        uuid: uid,
                                        encryption: encrypt(file[0].name),
                                    })
                                    history.push("/completion");

                                })
                                .catch(err => {
                                    setProgress(0);
                                    alert(err)
                                })
                        })
                }
            )
        } else {
            alert("Select files first")
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
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <div>
                                        {file.length === 0 ? "Drop files here, or click to select files" :
                                            <div>
                                                <img src={fileSVG} alt="" />
                                                <br />
                                                {file.length === 0 || file[0].name}
                                            </div>
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="button-div center-row">
                        <button type="submit" className="encrypt-button">Encrypt and upload</button>
                        <button onClick={() => history.push('/getfile')} className="decrypt-button">Download and decrypt</button>
                    </div>
                    <br />
                    {progress === 1 ? "File uploading..." : progress === 2 ? "Generating encryption key..." : ""}
                </form>
            </div>
        </div>
    );
};

export default Screen;