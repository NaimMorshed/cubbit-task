import React, { useContext } from 'react';
import { UserContext } from '../../App';
import svg from '../Home/files.svg';
import './Completion.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory } from 'react-router';

const Completion = () => {
    const [compData, setCompData] = useContext(UserContext);
    const history = useHistory();

    return (
        <div className="App">
            <div className="App-header">
                <h2>'4!!(3=s 4+3</h2>
                <div className="box">
                    <img src={svg} alt="" />
                    <p>{compData.name}</p>
                </div>

                <small>
                    <h4>Your file id:</h4>
                    <span className="data-input">
                        {compData.uuid}
                        <CopyToClipboard text="NaimMorshed"
                            onCopy={() => alert("Copied")}>
                            <button>Copy</button>
                        </CopyToClipboard>
                    </span>
                    <br /><br />
                    <h4>Your encryption id:</h4>
                    <span className="data-input">
                        {compData.encryption}
                        <CopyToClipboard text="NaimMorshed"
                            onCopy={() => alert("Copied")}>
                            <button>Copy</button>
                        </CopyToClipboard>
                    </span>
                </small>
                <button onClick={() => history.go(-1)} className="btn btn-primary mt-5">Go back to Home</button>
            </div>
        </div>
    );
};

export default Completion;