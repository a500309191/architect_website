import './githubBlock.css';
import React from "react";
import { UserRepositories}  from "./UserRepositories";
import { Fetch } from "../Fetch";

const UserDetails = ({ data }) => {
    return (
        <div className="github-block">
            <div className="github-block-header">GITHUB PAGE</div>
            <img className="user-photo" src={data.avatar_url} alt={data.login} />
            <div className="user-details">
                <div>{data.login}</div>
                <div>{data.name}</div>
                <div>{data.location}</div>
                <div>{data.blog}</div>
                <div>{data.email}</div>
            </div>
            <div className="github-repo-block">
                <div className="repo-header">REPOSITORIES:</div>
                <UserRepositories
                    login={data.login}
                    onSelect={repoName => console.log(`${repoName} selected`)}
                />
            </div>
        </div>
    )
}

export const GithubUserBlock = ({ login }) => {
    return (
        <Fetch
            uri={`https://api.github.com/users/${login}`}
            renderSuccess={UserDetails}
        />
    );
}

