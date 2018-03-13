import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ReactStars from "react-stars";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
  }
  render() {
    return (
      <div id="win" style={this.props.style}>
        <div className="overlay" />
        <div className="visible">
          <h2>Add movie rating</h2>
          <div className="content">
            <p>Name</p>
            <input type="text" ref="name" />
            <p>Year</p>
            <input type="number" ref="year" min="1900" max="2020" step="1" />
            <p>Genre</p>

            <select ref="genre">
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horrorfiction">Horrorfiction</option>
              <option value="Literaryrealism">Literaryrealism</option>
              <option value="Romance">Romance</option>
              <option value="Satire">Satire</option>
              <option value="Tragedy">Tragedy</option>
              <option value="Tragicomedy">Tragicomedy</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mythology">Mythology</option>
              <option value="Adventure">Adventure</option>
            </select>
            <p>Rating</p>

            <ReactStars
              half={false}
              onChange={i => this.setState({ rating: i })}
              value={this.state.rating}
            />
            <p>Comment</p>
            <input type="text" ref="comment" />
            <input
              type="button"
              onClick={this.update.bind(this)}
              value="Add movie"
            />
          </div>
          <button
            className="closeBut"
            type="button"
            onClick={this.props.clickClose}
          >
            close
          </button>
        </div>
      </div>
    );
  }
  update() {
    let movName = this.refs.name.value;
    let movYear = +this.refs.year.value;
    let movGenre = this.refs.genre.value;
    let movRating = +this.state.rating;
    let movComment = this.refs.comment.value;
    let newMovie = [
      {
        id: this.props.lastMov,
        name: movName,
        year: movYear,
        genre: movGenre,
        rating: movRating,
        comment: movComment
      }
    ];
    this.props.onUpdate(newMovie);
  }
}

function TableD(props) {
  return (
    <tr>
      <td>{props.obj.name}</td>
      <td>{props.obj.year}</td>
      <td>{props.obj.genre}</td>
      <td>{<ReactStars value={props.obj.rating} edit={false} />}</td>
      <td>{props.obj.comment}</td>
      <td>
        <button>View</button>
        <button>Edit</button>
        <button onClick={() => props.onDelete(props.count)}>Delete</button>
      </td>
    </tr>
  );
}

class TableRow extends React.Component {
  renderSquare(i) {
    return this.props.value.map((object, i) => (
      <TableD obj={object} count={i} key={i} onDelete={this.props.onDelete} />
    ));
  }

  render() {
    return this.renderSquare();
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [
        {
          id: 0,
          name: "Fast&Furious",
          year: 2001,
          genre: "comedy",
          rating: 5,
          comment:
            "The Fast and the Furious is a 2001 action crime film directed by Rob Cohen"
        }
      ],
      modal: {
        isVisible: false,
        modalStyle: {
          display: "none"
        }
      }
    };
  }

  modalChangeState() {
    if (!this.state.modal.isVisible) {
      this.setState({
        modal: {
          isVisible: !this.state.modal.isVisible,
          modalStyle: {
            display: "block"
          }
        }
      });
    } else {
      this.setState({
        modal: {
          isVisible: !this.state.modal.isVisible,
          modalStyle: {
            display: "none"
          }
        }
      });
    }
  }
  onUpdate(data) {
    let newMovList = this.state.movieList.concat(data);
    this.setState({ movieList: newMovList });
  }

  onDelete(data) {
    let conf = alert("Удалить фильм " + this.state.movieList[data].name + " ?");
    let value = data;
    let arr = this.state.movieList;
    arr.splice(value, 1);
    this.setState({ movieList: arr });
  }
  onViev(data) {}
  render() {
    return (
      <div>
        <button onClick={() => this.modalChangeState()}>
          Add movie rating
        </button>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
          <TableRow
            value={this.state.movieList}
            onDelete={this.onDelete.bind(this)}
            onViev={this.onViev.bind(this)}
          />
        </tbody>
        <Modal
          style={this.state.modal.modalStyle}
          clickClose={i => this.modalChangeState()}
          lastMov={this.state.movieList.length}
          onUpdate={this.onUpdate.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
