import App, { Container } from 'next/app'
import React from 'react'
import Firebase from '../lib/firebase'
import { loadTimetable, isServer, deepCompare, loadCompetitionBalance } from '../lib/functions'
import { initGA, logPageView } from '../lib/analytics'

if (!isServer()) {
  window.__FIREBASE__ = Firebase
}

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx, ...props }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // Disable global state construction on client
    if (!isServer()) {
      return {
        pageProps
      }
    }

    const database = Firebase.database()

    // Load initial data from FB here

    console.log('App getInitialProps')

    return {
      pageProps: pageProps,
      pageState: {
        // Here comes initial state
      }
    }
  }

  constructor(props) {
    super(props)

    this.state = props.pageState
  }

  componentDidMount() {
    if (window) window.__APP__ = this

    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()

    const database = Firebase.database()

    // Create data listeners here

    Firebase.auth().onAuthStateChanged((user) => {
      this.setState(state => ({user}))
    })
  }

  mapStateTopProps(propTypes) {
    if (!propTypes) return this.state

    const newState = {}

    Object // Map state to props by propTypes
      .keys(this.state)
      .map(key => {
        if (propTypes[key]) {
          newState[key] = this.state[key]
        }
      })

    return newState
  }

  render() {
    const { Component, pageProps, router } = this.props
    const { triggers, pages } = this.state

    return (
      <Container>
        <Component
          router={router}
          {...pageProps}
          {...this.mapStateTopProps(Component.propTypes)}
        />
      </Container>
    )
  }
}
