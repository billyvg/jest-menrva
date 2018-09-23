import React, { Component } from "react";
import styled from "react-emotion";
import propTypes from "prop-types";
import Link from "next/link";
import theme from "../styles/theme";
import ChevronRight from "./svg/ChevronRight";
import CommitData from "./CommitData";
import BuildStatus from "./BuildStatus";

class BuildInfo extends Component {
  static propTypes = {
    id: propTypes.number,
    commit: propTypes.string, //expound on this later
    snapshots: propTypes.array,
    status: propTypes.string,
    interactive: propTypes.bool,
    showMeta: propTypes.bool,
    showApproveButton: propTypes.bool,
    branch: propTypes.string,
    build: propTypes.string,
  };

  render() {
    let {
      branch,
      build,
      head_commit,
      repo,
      status,
      files,
      pr,
      pr_branch,
    } = this.props;

    return (
      <Link href={{ pathname: "/build", query: { repo, build } }}>
        <Container {...this.props}>
          <BuildStatus status={status} count={files?.length} size="small" />
          <div>
            <PullRequestTitle>
              {pr_branch || branch || "Unknown Build"}
            </PullRequestTitle>
            <div style={{ display: "flex", alignItems: "center" }}>
              <BuildNumber>#{build}</BuildNumber>
              {head_commit && (
                <CommitData commit={head_commit} repo={repo} pr={pr} />
              )}
            </div>
          </div>
          <StyledChevron />
        </Container>
      </Link>
    );
  }
}

let Container = styled("div")`
  color: ${theme.gray7};
  background: ${theme.gray2};
  text-decoration: none;
  padding: 2em 2em 2em;
  align-items: center;
  border-bottom: 1px solid ${theme.gray3};
  display: grid;
  grid-template-columns: 15px auto 10px;
  grid-column-gap: 3em;
  user-select: none;
  transition: 0.2s background;

  &:hover {
    background: ${theme.gray3};
    cursor: pointer;
  }
`;

let PullRequestTitle = styled("h1")`
  font-size: 20px;
  width: 100%;
  margin-bottom: 0.33em;
`;

let BuildNumber = styled("span")`
  font-weight: bold;
  font-size: 0.9em;
  margin-right: 0.25em;
`;

let StyledChevron = styled(ChevronRight)`
  height: 1.5em;
  path {
    stroke: ${theme.gray4};
  }
`;

export default BuildInfo;
