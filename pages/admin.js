import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Login from '../components/Login'
import Firebase from '../lib/firebase'
import { formatDate } from '../lib/functions'
import {
  Button,
  ListGroup,
  ListGroupItem,
  Input,
  Form,
  FormGroup,
  Table,
  Collapse,
  Card,
  CardBody
} from 'reactstrap'

import bootstrapStyles from 'bootstrap/dist/css/bootstrap.min.css'

const database = Firebase.database()

export default class AdminPanel extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  state = {
  }

  render() {
    const {
      user
    } = this.props

    return (
      <div>
        <Head key="admin-head">
          <style dangerouslySetInnerHTML={{ __html: bootstrapStyles }} />
        </Head>
        <Login user={user} />
        {user && (
          <div>
            Logged in!
          </div>
        )}
      </div>
    )
  }
}
