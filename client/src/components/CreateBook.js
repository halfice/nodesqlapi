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
      Guid: "",
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/smartapi/sms/061e71b1-aa7a-452a-a40f-44814a4faafc')
      .then(res => {
        this.setState({
          books: res.data[0][0].Data
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

  onclickevent() {
    this.setState({
      books: ""
    })
    var guid = this.state.Guid;
    axios
      .get(`http://localhost:8000/smartapi/sms/${guid}`)
      .then(res => {
        this.setState({
          books: res.data[0][0].Data
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
    if (items != null && items != "") {
      bookList = "[{" + this.state.books + "}]";//.map((item, key) =>
      try {
        ;
        var tmpbookList1 = JSON.stringify(parseJson(this.state.books));
        var tmpstringsplit = tmpbookList1.split(',');
        for (var x = 0; x < tmpstringsplit.length; x++) {
          bookList1 += tmpstringsplit[x] + "\n";
        }



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
              onChange={this.handleChange.bind(this)} name="guidtxt" className="txtcss" />
            <button onClick={this.onclickevent.bind(this)} >Submit</button>
          </div>

          <div className="list">
            <textarea rows="4" cols="50" className="textareacss" value={bookList1}>
            </textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBook;