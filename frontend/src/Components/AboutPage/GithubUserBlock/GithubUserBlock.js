import React from "react";
import { UserRepositories }  from "./UserRepositories";
import { Fetch } from "../../Fetch";

export const GithubUserBlock = ({ login }) => {
    return (
        <Fetch
            uri={`https://api.github.com/users/${login}`}
            renderSuccess={UserDetails}
        />
    );
}

const UserDetails = ({ data }) => {
    return (
        <div className="github-block">
            <a href={data.html_url} className="github-block-header">GITHUB PAGE</a>
            <img className="user-photo" src={data.avatar_url} alt={data.login} />
            <div className="user-details">
                {data.login && <a href={data.html_url}>{data.login}</a>}
                {data.name && <div>{data.name}</div>}
                {data.location && <div>{data.location}</div>}
                {data.blog && <div>{data.blog}</div>}
                {data.email && <div>{data.email}</div>}
            </div>
            <UserRepositories login={data.login} />
        </div>
    )
}




