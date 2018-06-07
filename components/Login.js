import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Firebase from '../lib/firebase'
import {Button, Alert, Form, FormGroup, Label, Input} from 'reactstrap'

export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  login = () => {
    const {
      email,
      password
    } = this.state

    Firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
      this.setState({
        error: err.message
      })
    })
  }

  loginGoogle = () => {
    const provider = new Firebase.auth.GoogleAuthProvider()
    Firebase.auth().signInWithPopup(provider)
      .catch((err) => {
        this.setState({
          error: err.message
        })
      })
  }

  loginFacebook = () => {
    const provider = new Firebase.auth.FacebookAuthProvider()
    Firebase.auth().signInWithPopup(provider)
      .catch((err) => {
        this.setState({
          error: err.message
        })
      })
  }

  logout = () => {
    Firebase.auth().signOut()
  }

  render() {
    const {
      email,
      password,
      error
    } = this.state

    const {
      user,
      ...props
    } = this.props

    return user ? (
      <Button onClick={this.logout} id="logout-form" {...props}>Logout</Button>
    ) : (
      <Form {...props}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" onChange={e => this.setState({email: e.target.value})} value={email} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" onChange={e => this.setState({ password: e.target.value })} value={password} />
        </FormGroup>
        <Button onClick={this.login}>Login</Button>
        <Button onClick={this.loginGoogle} color="danger">Google</Button>
        <Button onClick={this.loginFacebook} color="primary">Facebook</Button>
        {error && <Alert color="danger">{error}</Alert>}
      </Form>
    )
  }
}
