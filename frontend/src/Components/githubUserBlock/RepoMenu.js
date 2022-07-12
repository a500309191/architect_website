import React, { useEffect } from "react";
import { useIterator } from "./hooks/UseIterator_2";
import RepositoryReadme from "./Readme";

export default function RepoMenu({ repositories, login }) {
  const [{name}, previous, next] = useIterator(repositories);

  return (
    <>
      <div className="repo-menu" style={{ display: "flex" }}>
        <div className="prev-button" onClick={previous}>&lt;</div>
        <div className="repo-name">{name}</div>
        <div className="next-button" onClick={next}>&gt;</div>
      </div>
    </>
  );
}

//<RepositoryReadme login={login} repo={name} />