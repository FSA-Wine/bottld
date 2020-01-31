import { useRouter } from 'next/router'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchSingleWine from '../../store/singleWine'

class SingleWine extends Component {

  constructor() {
    super()
    const router = useRouter()
  }

  componentDidMount() {
    //this.props.fetchSingleWine(router.query.id)
    console.log(router.query.id)
  }

  render() {

    return (
      <div>
        <h1>Wine #{router.query.id}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    singleWine: state.singleWine
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleWine: id => dispatch(fetchSingleWine(id))
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


