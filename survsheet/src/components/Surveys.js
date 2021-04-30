import React from 'react';
import axios from 'axios';

class Surveys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: true,
            card: false,
            surveys: [],
            survey: {},
        };
        this.handleDownload = this.handleDownload.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8000/upload")
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ surveys: responseJson.data });
            },
            )
    }

    showCard = id => {
        fetch(`http://localhost:8000/upload/${id}`)
            .then(response => response.json())
            .then(
                responseJson => { this.setState({ survey: responseJson.data }) },
            );
        this.setState({
            list: false,
            card: true
        });
    };

    showList = () => {
        this.setState({
            card: false,
            list: true
        });
    };

    handleDownload = (ev) => {
        ev.preventDefault();
        console.log(ev.target.id);

        const form = new FormData(document.getElementById(ev.target.id));

        axios
            .post('http://localhost:8000/download', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            )
            .then(function (response) {
                alert(response)
            })
            .catch(err => {
                console.error(err);
            });
    }


    render() {
        return (
            <div className="container my-5">
                {/*List View */}
                <p className="h4 my-3">Your Survey Data</p>
                {this.state.list ? (
                    <div className="list-group">
                        {this.state.surveys.map(survey => (
                            <li
                                onClick={() => this.showCard(survey.id)}
                                className="list-group-item list-group-item-action"
                            >
                                <h5>{survey.sheetname}</h5>
                                {survey.row ? (
                                    <div className="lead"><p>Row: {survey.row}</p> <p>Column: {survey.col}</p></div>
                                ) : <div>
                                    {
                                        survey.filename ? (
                                            <p>{survey.filename}</p>
                                        ) : null
                                    }
                                </div>}

                            </li>
                        ))}
                    </div>
                ) : null}

                {/*Card View */}
                {this.state.card ? (
                    <div className="card mx-auto" style={{ width: "18rem" }}>
                        <div class="card-body card-text">
                            <h2>{this.state.survey.sheetname}</h2>
                            <table className="table table-bordered table-striped">
                                <tbody>
                                    <tr >
                                        <td className="align-middle ">Position in {this.state.survey.sheetname}</td>
                                        <td className="align-middle ">Row {this.state.survey.row}, Column {this.state.survey.col}</td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle ">Comment</td>
                                        <td className="align-middle ">{this.state.survey.comment}</td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle ">File Uploaded</td>
                                        <td className="align-middle ">
                                            <button onClick={(ev) => { ev.preventDefault(); window.open(`http://localhost:8000/download?file=${this.state.survey.filename}`, '_blank') }} className="btn btn-warning">{this.state.survey.filename}</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div onClick={() => this.showList()} class="btn btn-secondary">
                                Back
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default Surveys;