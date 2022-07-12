import React from "react";
import { GithubUserBlock } from "./githubUserBlock/GithubUserBlock"

export const Main = () => {
    return (
        <div className="main-page">
           <GithubUserBlock login="a500309191" />
        </div>
    )
}