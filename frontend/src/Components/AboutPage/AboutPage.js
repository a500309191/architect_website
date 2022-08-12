import React from "react";
import { InfoBlock } from "./InfoBlock/InfoBlock"
import { GithubUserBlock } from "./GithubUserBlock/GithubUserBlock"

export const AboutPage = () => {
    return (
        <div className="about-page">
            <GithubUserBlock login="a500309191" />
            <InfoBlock />
        </div>
    )
}