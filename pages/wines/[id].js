import { useRouter } from 'next/router'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSingleWine, getSingleWine } from '../../store/singleWine'
import { likeWine } from '../../store/user'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Image, Button } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import SingleWineDetails from '../../components/SingleWineDetails'
import SingleWineCharts from '../../components/SingleWineCharts'
import RecommendRow from '../../components/RecommendRow'

const SingleWine = props => {
  const router = useRouter()

  return <SingleWineWithoutRouter {...props} router={router} />
}

class SingleWineWithoutRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      liked: false,
      tried: false,
    }
  }

  componentDidMount() {
    this.props.fetchSingleWine(this.props.router.query.id)
    // if (this.props.user) {
    //   const liked = this.props.user.likedWines.filter(wine => {
    //     return (
    //       wine._fields[0].properties.id.low ===
    //       this.props.singleWine[0][0]._fields[0].properties.id.low
    //     )
    //   })
    //   const tried = !liked[0]
    //     ? this.props.user.triedWines.filter(wine => {
    //         return (
    //           wine._fields[0].properties.id.low ===
    //           this.props.singleWine[0][0]._fields[0].properties.id.low
    //         )
    //       })
    //     : [true]
    //   if (liked[0]) this.setState({ liked: true })
    //   if (tried[0]) this.setState({ tried: true })
    // }
  }
  componentDidUpdate(prevProps) {
    if (this.props.router.query.id !== prevProps.router.query.id)
      this.props.fetchSingleWine(this.props.router.query.id)
  }

  componentWillUnmount() {
    this.props.getSingleWine([])
  }

  onLike = () => {
    this.props.likeWine(
      this.state.liked,
      this.props.user,
      this.props.singleWine[0][0]._fields[0].properties
    )
    this.setState(prevState => {
      return { liked: !prevState.liked }
    })
  }

  render() {
    const singleWine = this.props.singleWine

    if (singleWine.length) {
      let flavorData = singleWine[2]
      let recWineArr = singleWine[1]
      let curWine = singleWine[0][0]._fields[0].properties
      return (
        <Layout>
          <div className="content smaller-text">
            <div className="top-section">
              <Grid centered stackable doubling columns={3} style={{ margin: `35px` }}>
                <Grid.Column width={2} only="tablet computer">
                  <Image
                    centered
                    src="/wineRed.png"
                    alt="red wine"
                    style={{ width: `120px`, top: `9px` }}
                  />
                  <Button onClick={this.onLike}>{this.state.liked ? 'Unlike' : 'Like'}</Button>
                </Grid.Column>
                <Grid.Column width={8}>
                  <SingleWineDetails singleWine={curWine} />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={6}>
                  <SingleWineCharts flavorData={flavorData} singleWine={curWine} />
                </Grid.Column>
              </Grid>
            </div>
            <div className="lower-section-bg">
              <div className="lower-section">
                <Grid>
                  <Grid.Row>
                    <RecommendRow recWines={recWineArr} />
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          </div>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <div> Nothing Found</div>
        </Layout>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    singleWine: state.singleWine,
    user: state.user,
    isLoggedIn: state.user.googleId,
  }
}

const mapDispatchToProps = {
  fetchSingleWine,
  getSingleWine,
  likeWine,
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleWine)
