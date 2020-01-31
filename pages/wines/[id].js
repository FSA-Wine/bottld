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
    console.log("this?", this);
    console.log("props?", this.props);
  }

  render() {
    return (
      <div>
        <h1>Wine #{this.props.router.query.id}</h1>
      </div>
    );
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
