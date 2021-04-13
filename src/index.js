import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


class Ludobaum extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        nodes: []
      };
  }

  componentDidMount() {

    fetch("http://localhost:8080/nodes")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            nodes: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, nodes } = this.state;
    if(error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      console.log(nodes);
      return (

         <NodeList nodes={nodes}/>
      );
    }
      
  }
}

class NodeList extends React.Component{
  render() {
      console.log(this.props);
      const nodes = this.props.nodes._embedded.nodeList.map(node =>
          <Node key={node._links.self.href} node={node}/>
      );
      return (
          <table>
              <tbody>
              <tr>
                  <th>id</th>
                  <th>posX</th>
                  <th>posY</th>
              </tr>
              {nodes}
              </tbody>
          </table>
      )
  }
}

class Node extends React.Component{
  render() {
      return (
          <tr>
              <td>{this.props.node.id}</td>
              <td>{this.props.node.posX}</td>
              <td>{this.props.node.posY}</td>
          </tr>
      )
  }
}



ReactDOM.render(
  <React.StrictMode>
    <Ludobaum />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
