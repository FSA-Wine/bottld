import { useRouter } from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleWine } from "../../store/singleWine";

const SingleWine = props => {
  const router = useRouter();

  return <SingleWineWithoutRouter {...props} router={router} />;
};

class SingleWineWithoutRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loc: props.router.query.loc,
      loaded: false
    };
  }

  componentDidMount() {
    this.props.fetchSingleWine(this.props.router.query.id);
  }

  render() {
    console.log(this.props.singleWine);
    const singleWine = this.props.singleWine;
    if (singleWine.length) {
      let curWine = singleWine[0]._fields[0].properties;
      return (
        <div>
          <div>Wine Found!</div>
          <div>{curWine.title}</div>
        </div>
      );
    } else {
      return <div> Nothing Found</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    singleWine: state.singleWine
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleWine: id => dispatch(fetchSingleWine(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleWine);

// export default () => {
//   const router = useRouter()

//   return (
//     <>
//       <h1>Wine #{router.query.id}</h1>
//     </>
//   )
// }
