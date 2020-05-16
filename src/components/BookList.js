import React, { Component } from "react";
import "./../css/BookList.css";
import {
  BrowserRouter as Switch,
  Router,
  Link,
  useLocation,
  useParams
} from "react-router-dom";
import { Table, Button, Input } from "antd";
import classNames from "classnames";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInputValue: "",
      showForm: false
    };

    this.inputElement = React.createRef();

    this.onSearch = this.onSearch.bind(this);
    this.showSearch = this.showSearch.bind(this);
  }

  onSearch(value) {
    this.setState({
      searchInputValue: value
    });
  }

  showSearch() {
    this.setState({
      showForm: true
    });
  }

  componentDidUpdate() {}

  render() {
    const { searchInputValue, showForm } = this.state;
    const { books } = this.props;
    const { Search } = Input;

    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price"
      }
    ];

    return (
      <div className="BookList">
        <Button type="primary" className="Search-Button">
          <Link to="/search" onClick={this.showSearch}>
            Search something
          </Link>
        </Button>
        
        {showForm && (
          <div className="Search-Area">
            <Search
              placeholder="Type something..."
              enterButton="Search"
              size="large"
              onSearch={this.onSearch}
              ref={this.inputElement}
            />
          </div>
        )}

        {searchInputValue && (
          <Table
            dataSource={books.filter(book => {
              return book.title.indexOf(searchInputValue) !== -1;
            })}
            columns={columns}
            className="Table"
          />
        )}
        {!searchInputValue && (
          <Table dataSource={books} columns={columns} className="Table" />
        )}
      </div>
    );
  }
}

export default BookList;
