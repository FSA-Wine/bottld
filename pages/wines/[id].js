import { useRouter } from 'next/router'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { fetchSingleWine } from '../../store/singleWine'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Image } from 'semantic-ui-react'
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
      loc: props.router.query.loc,
      loaded: false,
    }
  }

  componentDidMount() {
    this.props.fetchSingleWine(this.props.router.query.id)
  }

  render() {
    const singleWine = this.props.singleWine

    if (singleWine.length) {
      let recWineArr = this.props.singleWine[1]
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
                </Grid.Column>
                <Grid.Column width={8}>
                  <SingleWineDetails singleWine={curWine} />
                </Grid.Column>
                <Grid.Column doubling stackable mobile={16} tablet={16} computer={6}>
                  <SingleWineCharts />
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleWine: id => dispatch(fetchSingleWine(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleWine)

// export default () => {
//   const router = useRouter()

//   return (
//     <>
//       <h1>Wine #{router.query.id}</h1>
//     </>
//   )
// }
