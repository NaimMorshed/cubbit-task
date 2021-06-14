import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import './LastScreen.css';

const LastScreen = () => {
    const { id }: { id: string } = useParams();
    const inputRef = useRef(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/getData')
            .then(res => res.json())
            .then(data => {
                data.map(data => {
                    if (data.uuid === id) {
                        setData(data);
                    }
                })
            })
            .catch(err => console.log(err))
    }, [])

    const submit = (event: any) => {
        event.preventDefault();
        if (inputRef.current.value === data.encryption) {
            alert("Encryption key matched");
            // url navigate
            document.getElementById('clicker').click();
        } else alert("Encryption key not matched");
    }

    return (
        <div className="App">
            <div className="App-header">
                <h2 className="mb-5 pb-5">'4!!(3=s 4+3</h2>

                <section className="parent">
                    <div className="left">File id:</div>
                    <div className="right"><small>{id}</small></div>
                </section>

                <section className="parent">
                    <div className="left">File name:</div>
                    <div className="right"><small>{data === null ? "Data not found" : data.name}</small></div>
                </section>

                <section className="parent">
                    <div className="left">File size:</div>
                    <div className="right"><small>{data === null ? "Data not found" : Math.floor((data.size / 1024)) + "kb"}</small></div>
                </section>

                <section className="parent">
                    <div className="left">File mime:</div>
                    <div className="right"><small>{data === null ? "Data not found" : data.mime}</small></div>
                </section>

                {
                    data != null &&

                    <div>
                        <p className="mt-5">Insert your encryption key:</p>
                        <form onSubmit={submit} className="center-col">
                            <input ref={inputRef} className="download-input" type="text" required />
                            <input className="download-button" type="submit" value="Decrypt and download" />
                            <div>
                                <a id="clicker" href={data.url} rel='noreferrer' target="_blank" hidden>Click</a>
                            </div>
                        </form>
                    </div>
                }

            </div>
        </div>
    );
};

export default LastScreen;