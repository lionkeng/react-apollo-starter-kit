// SplashPage.js
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import isEqual from 'lodash.isequal';
import classnames from 'classnames';

import { StyleSheet, css } from 'aphrodite'

// MyComponent is a "presentational" or apollo-unaware component,
// It could be a simple React class:

class MyComponent extends Component {
  render() {

    const fudge = 100;
    const max_height = (global.window) ? global.window.innerHeight - fudge : 
    768 - fudge;

    let bg_image = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    let prefix = "//res.cloudinary.com/renderinghouse/image/upload/c_scale,h_" +
    max_height + "/tmp/";

    
    if (!this.props.data.loading) {
      bg_image = prefix + this.props.data.photo.fname; 
      console.log(bg_image);
    }

    const styles = StyleSheet.create({
      splashContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        width: '100%',
        height: max_height,
        backgroundSize: `cover`,
        backgroundPosition: `center 67%`,
        backgroundImage: `url(${bg_image})`
      }
    });
    // need to separate out the background image from the main CSS style
    // because aphrodite's SSR usage throws an error when we place background
    // image as an attribute in myCss.
    return (
      <div className={classnames('container', css(styles.splashContainer))}>
      </div>
    );

    // return (<div className="container"><h1>Hello</h1></div>);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const equality = isEqual(nextProps.data.photo, this.props.data.photo);
    return !equality;
  }
}

// Initialize GraphQL queries or mutations with the `gql` tag
const MyQuery = gql`query {
  photo {
    name
    fname
    location
  } 
}`;
// const MyMutation = gql`mutation MyMutation { addTodo(text: "Test 123") }`;

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)

const MyComponentWithData = graphql(MyQuery)(MyComponent);

/*
const MyComponentWithData = graphql(POKEMON_QUERY, { options: {
  variables: { name: "charmander" },
}});
*/

// Or, we can bind the execution of MyMutation to a prop
// const MyComponentWithMutation = graphql(MyMutation)(MyComponent);

export default MyComponentWithData;