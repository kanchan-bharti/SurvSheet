import React from 'react';
import axios from 'axios';
import Surveys from './Surveys';

class mySpreadsheet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedFile: [],
      fileName: '',
      comment: '',
      id: '',
      column: 1,
      sheetName: '',
      showSurveys: false
    };
    this.addRow = this.addRow.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.updateInputFile = this.updateInputFile.bind(this);
    this.updateInputFileName = this.updateInputFileName.bind(this);
    this.updateInputComment = this.updateInputComment.bind(this);
    this.updateColumn = this.updateColumn.bind(this);
    this.updateSheetName = this.updateSheetName.bind(this);
    this.toggleSurveyView = this.toggleSurveyView.bind(this);
  };

  componentDidMount() {
    this.addRow();
  };

  //=========Updating Sheet Name for Upload========================//

  updateSheetName(ev) {
    this.setState({
      sheetName: ev.target.value
    }, () => console.log(this.state.sheetName))
  }

  //================================================================//

  ////////////////////////////////////////////////////////////////////

  //=========Toggle of state to show Survey Data====================//

  toggleSurveyView(){
    this.setState({
      showSurveys: !this.state.showSurveys
    })
  }

  //================================================================//


  ////////////////////////////////////////////////////////////////////

  //================Adding Header Fields using loop=================//

  headerCreator(c) {
    let col = []
    for (var i = 0; i < c; i++) {
      col.push(
        <th>
          <form id="sheetheadColumn" onSubmit={this.handleUpload}>
            <input type="text" className="no-bdr-input text-center h5" name="column" placeholder={`Column ${i + 1}`} />
            <input type="hidden" value={i} />
          </form>
        </th>)
    }
    return col;
  }

  //=================================================================//

  ////////////////////////////////////////////////////////////////////

  //=========Adding Row- Active when Add Row button is clicked=======//

  addRow() {
    let { data } = this.state;
    data.push(data.length);
    this.setState({ data });
  }

  //===============================================================//

  //////////////////////////////////////////////////////////////////

  //===============Updating Uploaded Input Fields==================//

  updateInputFile(ev) {
    this.setState({
      selectedFile: ev.target.files[0]
    }, () => console.log(this.state.selectedFile))

  }

  updateInputFileName(ev) {
    this.setState({
      fileName: ev.target.value
    }, () => console.log(this.state.fileName));
  }

  updateInputComment(ev) {
    this.setState({
      comment: ev.target.value
    }, () => console.log(this.state.comment))

  }


  //================================================================//

  ////////////////////////////////////////////////////////////////////

  //==Handling Upload: Active when Upload Button is clicked for each cell====//


  handleUpload(ev) {
    ev.preventDefault();
    console.log(ev.target.id);

    const form = new FormData(document.getElementById(ev.target.id));

    axios
      .post('http://localhost:8000/upload', form, {
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

  //================================================================//

  ////////////////////////////////////////////////////////////////////

  //================Handle Sheet Details Columns====================//


  handleSheetHeads(ev) {
    ev.preventDefault();
    console.log(ev.target.id);

    const form = new FormData(document.getElementById(ev.target.id));

    axios
      .post('http://localhost:8000/upload', form, {
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

  //================================================================//


  //=======================Adding Columns===========================//

  updateColumn(ev) {
    const c = ev.target.value;
    this.setState({
      column: c
    })
  }

  //================================================================//

  ////////////////////////////////////////////////////////////////////

  //======================Adding Rows using loop====================//

  rowCreator(id, c) {
    let row = []
    let u = id * 100;
    for (var i = 0; i < c; i++) {
      let uid = u + i * 3
      let cellid = id * c + i
      row.push(
        <td>
          <form id={`formCell${cellid}`} onSubmit={(ev) => this.handleUpload(ev)}>
            <small className="input-group d-flex flex-column">
              <input type="file" className="mx-auto col-9 p-0 my-1" name="file" id={uid + 1} onChange={(ev) => { this.updateInputFile(ev) }} />
              <input className="mx-auto p-0 col-9 my-1" size="33" type="text" id={uid + 3} name="comment" placeholder={`Comment`} onChange={(ev) => { this.updateInputComment(ev); }} />
              <input type="hidden" name="uid" value={cellid} />
              <input type="hidden" name="sheetName" value={this.state.sheetName} />
              <input type="hidden" name="col" value={i + 1} />
              <input type="hidden" name="row" value={id + 1} />
              <button className="submit p-0 mx-auto col-9 my-1" type="submit">Upload</button>
            </small>
          </form>
        </td>
      )
    }
    return row
  }

  //=================================================================//

  ////////////////////////////////////////////////////////////////////


  render() {
    return (
      <div className="text-center">
        {
          this.state.showSurveys ? <Surveys/> : <div>
            <div className="container">
              <div className="row">
              <button className="btn mx-auto m-2 btn-secondary" onClick={this.toggleSurveyView}>
                  Show Survey Data
              </button>
              </div>
              <label className="label">
                No. of Columns:
                  <input className="btn btn-secondary placeholder-white my-2 mx-2 col-md-6" type="number" onChange={(ev) => this.updateColumn(ev)} value={this.state.column} min="1" />
              </label>
              <button className="btn btn-md btn-secondary m-4 " id="addBtn" type="button" onClick={this.addRow}>
                Add new Row
              </button>

            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="bg-warning">
                  <tr>
                    <th><input type="text" name="sheetName" onChange={(ev) => this.updateSheetName(ev)} className="no-bdr-input text-center text-light h5" placeholder="Sheet Name" /></th>
                    {this.headerCreator(this.state.column)}
                  </tr>
                </thead>
                <tbody id="tbody">
                  {this.state.data.map(id => (
                    <tr id={id}>
                      <td className="align-middle ">
                        <div className="cell">
                          <input type="text" name="row" placeholder={`${id + 1}`} className="no-bdr-input mx-auto m-2 text-center row" />
                        </div>
                      </td>
                      {this.rowCreator(id, this.state.column)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default mySpreadsheet;