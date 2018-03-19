import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ReactStars from "react-stars";




class ModalContent extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      _setRating: this.props.movieListToChange.rating,
    };
  }

  addMov() {

    let newMovie = [
      {
        id: this.props.newMovieID,
        name: this.refs.name.value,
        year: this.refs.year.value,
        genre: this.refs.genre.value,
        rating: this.state._setRating,
        comment: this.refs.comment.value
      }
    ];
    this.props.onUpdate(newMovie);
  }
  editMov() {
    
    let newMovie = [
      {
        id: this.props.movieListToChange.id,
        name: this.refs.name.value,
        year: this.refs.year.value,
        genre: this.refs.genre.value,
        rating: this.state._setRating,
        comment: this.refs.comment.value
      }
    ];
    this.props.onUpdate(newMovie);
  }
  render() {


    if(this.props.actionType === 'add'){
            return (
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
              onChange={i => this.setState({ _setRating: i })}
              value={this.state._setRating}
            />
            <p>Comment</p>
            <input type="text" ref="comment" />

          </div>
                      <button
              type="button"
              onClick={this.addMov.bind(this)}
              value="Add movie"
            >Add movie</button>
          <button
            className="closeBut"
            type="button"
            onClick={this.props.clickClose}
          >
            close
          </button>
        </div>
      );
      
    } else if(this.props.actionType === 'edit')
    {

      return (
                <div className="visible">
          <h2>Add movie rating</h2>
          <div className="content">
            <p>Name</p>
            <input type="text" ref="name" value={this.props.movieListToChange.name}/>
            <p>Year</p>
            <input type="number" ref="year" min="1900" max="2020" step="1" value={this.props.movieListToChange.year}/>
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
              onChange={i => this.setState({ _setRating: i })}
              value={this.state._setRating}
            />
            <p>Comment</p>
            <input type="text" ref="comment" value={this.props.movieListToChange.comment}/>

          </div>
                      <button
              type="button"
              onClick={this.editMov.bind(this)}
              value="Add movie"
            >Edit movie</button>
          <button
            className="closeBut"
            type="button"
            onClick={this.props.clickClose}
          >
            close
          </button>
        </div>
      );
    }
    return <h1></h1>;
  }

}

class Modal extends React.Component {


  render() {
    
    
      return (
      <div id="win" style={this.props.style}>
      <ModalContent
          actionType={this.props.actionType}
          movieListToChange={this.props.movieListToChange}
          clickClose={this.props.clickClose}
           onUpdate={this.props.onUpdate}
           
           />
        <div className="overlay">
          
          
        </div>
      </div>
    );
   
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
        <button onClick={() => props.onView(props.count)}>View</button>
        <button onClick={() => props.onEdit(props.count)}>Edit</button>
        <button onClick={() => props.onDelete(props.count)}>Delete</button>
      </td>
    </tr>
  );
}

class TableRow extends React.Component {
  renderSquare(i) {
    return this.props.value.map((object, i) => (
      <TableD 
      obj={object} 
      count={i} 
      key={i} 
      onDelete={this.props.onDelete} 
      onView={this.props.onView}
      onEdit={this.props.onEdit}
      />
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
        },
        {
          id: 1,
          name: "Batman",
          year: 2005,
          genre: "comedy",
          rating: 5,
          comment:
            "The movie about very strong, rich and parentless fluing mouse"
        },
        {
          id: 2,
          name: "Fast&Furious",
          year: 2001,
          genre: "comedy",
          rating: 3,
          comment:
            "The Fast and the Furious is a 2001 action crime film directed by Rob Cohen"
        },
      ],
      modal: {
        isVisible: false,
        modalStyle: {
          display: "none"
        },
        actionType: null,
        actionID: 0
      }
    };
  }
    onUpdate(data) {
    let existArr = Object.assign([],this.state.movieList);
    existArr[data[0].id] = data[0];
    // alert(existArr[0].data.id)
    this.setState({ movieList: existArr });
  }

  onDelete(data) {
    let conf = alert("Удалить фильм " + this.state.movieList[data].name + " ?");
    let value = data;
    let arr = this.state.movieList;
    arr.splice(value, 1);
    this.setState({ movieList: arr });
  }
  onViev(data) {

  }
  onEdit(data) {

    this.modalChangeState('edit', data);

  }
  
  render() {
    return (
      <div>
        <button onClick={() => this.modalChangeState('add')}>
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
            onEdit={this.onEdit.bind(this)}
          />
        </tbody>
        <Modal
          actionType={this.state.modal.actionType}
          style={this.state.modal.modalStyle}
          movieListToChange={this.state.movieList[this.state.modal.actionID]}
          newMovieID={this.state.movieList.length}
          onUpdate={this.onUpdate.bind(this)}
          clickClose={i => this.modalChangeState()}
        />
      </div>
    );
  }

  //Changing .state at the App/ by set actionType(add,edit,viev) and set selected movie ID
  // by actionData and toogle modal visible.
  modalChangeState(actionType, actionData) {
    if (!this.state.modal.isVisible) {
          this.setState({
        modal: {
          isVisible: !this.state.modal.isVisible,
          modalStyle: {
          display: "block"
          },
          actionType: actionType,
          actionID: actionData
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


}

ReactDOM.render(<App />, document.getElementById("root"));
