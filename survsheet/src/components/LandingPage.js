import React from 'react';
import Surveys from './Surveys';

export default function LandingPage(props){
    return(
        <div className="container text-center">
            <button value={1} className="btn btn-warning m-5" onClick={props.createnew}>Create new SurvSheet</button>
            <div className="description">
                <Surveys/>
            </div>
        </div>
    );
}