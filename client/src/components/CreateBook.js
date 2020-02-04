import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var cors = require('cors')
const parseJson = require('parse-json');
class CreateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      Guid:"ea442f52-ccf0-498c-98c2-48209a17bbba",
      JsonObject:"",
      StepId:"",
      StepNameCaption:"",
      StepCaption:"",
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:8000/smartapi/sms/ea442f52-ccf0-498c-98c2-48209a17bbba')
      .then(res => {
        this.setState({
          books: res.data.recordset[0].Data,//.data[0][0].Data,
          JsonObject: res.data.recordset[0].Data,//.data[0][0].Data,
          Guid:"ea442f52-ccf0-498c-98c2-48209a17bbba"
          
        })
      })
      .catch(err => {
        console.log(err + 'Error from ShowBookList');
      })
  };

  handleChange(evt) {
    //alert(evt.target.value);
    this.setState({ Guid: evt.target.value });
  }

  handleChangetxtarea(evt) {
    //alert(evt.target.value);
    this.setState({ JsonObject: evt.target.value,
      books:evt.target.value });
  }

  handleChangeStepId(evt) {
    this.setState({ StepId: evt.target.value });
  }

  handleChangeStepNameCaption(evt) {
    this.setState({ StepNameCaption: evt.target.value });
  }
  handleChangeStepCaption(evt) {
    this.setState({ StepCaption: evt.target.value });
  }
   
  onClickUpdates()
  {
   // alert(this.state.StepId)
   // alert(this.state.StepNameCaption)
   // alert(this.state.StepCaption)
  }
  onClickUpdate()
  {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
    const params = new URLSearchParams();

    params.append('Id', this.state.Guid);
    params.append('Data',this.state.JsonObject);
    params.append('stepid',this.state.StepId);
    params.append('stepnamecaption',this.state.StepNameCaption);
    params.append('stepcaption',this.state.StepCaption);
    
    axios({
      method:"PUT",
      //url:"http://localhost:8000/smartapi/ups",
      url:'http://localhost:8000/smartapi/ups/',
      data:params,
      crossDomain: true
        },config).then(res=>{
     // console.log(res);
    })
    .catch(err=>{
      console.log(err);

    });//axios end

    
  }

  onclickevent() {
    this.setState({
      books: ""
    })
    var guid = this.state.Guid;
    axios
      .get(`http://localhost:8000/smartapi/sms/${guid}`)
      .then(res => {
        this.setState({
          books: res.data.recordset[0].Data,//.data[0][0].Data,
          JsonObject: res.data.recordset[0].Data,//.data[0][0].Data,
        })
      })
      .catch(err => {
        console.log(err + 'Error from ShowBookList');
      })
  }


  render() {
    var items = this.state.books;
    let bookList = [];
    let bookList1 = [];
    let bookList2 = [];
    if (items != null && items != "") {
      bookList = "[{" + this.state.books + "}]";//.map((item, key) =>
      try {
        ;
        var tmpbookList1 = JSON.stringify(parseJson(this.state.books));
        var tmpstringsplit = tmpbookList1.split(',');
        for (var x = 0; x < tmpstringsplit.length; x++) {
          if (x==tmpstringsplit.length-1){
            bookList1 += tmpstringsplit[x] + "\n";
          }else
          {bookList1 += tmpstringsplit[x] + ",\n";}
          
        }
        bookList2=items;



      } catch (error) {
        throw error;
      }
      //<li key={item.id}>{item.name}</li>
      //);
    }
    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Item Details - Json Data</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-book" className="btn btn-outline-warning float-right">
                Smart Entity - Link
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>
          <div>

            <input type="text" placeholder="Search..." defaultValue="Search..."
              onChange={this.handleChange.bind(this)} name="guidtxt" className="txtcsssearch" />
            <button  className="buttonclass"  onClick={this.onclickevent.bind(this)} >Submit</button>
          </div>


          <div className="list">
            <textarea rows="4" cols="50"  onChange={this.handleChangetxtarea.bind(this)} className="textareacss" value={bookList2}>
            </textarea>
         </div>
         <div>
<label>StepId </label>
<input type="text" placeholder="Enter StepId" className="txtcss"  onChange={this.handleChangeStepId.bind(this)} />
<label>Step Name Caption</label>
<input type="text" placeholder="Enter StepId" className="txtcss" onChange={this.handleChangeStepNameCaption.bind(this)} />
<label>Step Caption</label>
<input type="text" placeholder="Enter StepId" className="txtcss" onChange={this.handleChangeStepCaption.bind(this)} />
          </div>
<hr></hr>
         <div className="buttonclass" >
         <div className="list">
          <button  className="buttonclass" onClick={this.onClickUpdate.bind(this)} >Update</button>
          </div>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }
}

export default CreateBook;