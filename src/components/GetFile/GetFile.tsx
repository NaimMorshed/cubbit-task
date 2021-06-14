import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './GetFile.css';

const GetFile = () => {
    const idRef = useRef(null);
    const history = useHistory();

    const submit = (event: any) => {
        event.preventDefault();
        history.push(`/lastscreen/${idRef.current.value}`);
    }

    return (
        <div className="App">
            <div className="App-header">
                <h2 className="mb-5 pb-5">'4!!(3=s 4+3</h2>
                <small>
                    <h4>Your file id:</h4>
                    <form onSubmit={submit} className="center-col form-custom">
                        <input className="m-2 custom-input" type="text" ref={idRef} required />
                        <input className="get-file m-2" type="submit" value="Get file" />
                    </form>
                </small>
            </div>
        </div>
    );
};

export default GetFile;