import React from "react";
import { GithubUserBlock } from "./githubUserBlock/GithubUserBlock"
import { SummaryBlock } from "./SummaryBlock"

export const MainPage = () => {
    return (
        <div className="main-page">
            <GithubUserBlock login="a500309191" />
            <SummaryBlock />
        </div>
    )
}