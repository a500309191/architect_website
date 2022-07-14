import { Fetch } from "../../Fetch";
import { useState } from "react";

export const UserRepositories = ({ login }) => {
    return (
        <Fetch
            uri={`https://api.github.com/users/${login}/repos`}
            renderSuccess={({ data }) => (
                <RepoMenu repos={data} />
            )}
        />
    )
}

const RepoMenu = ({repos}) => {

    const [index, setIndex] = useState(0)
    const prevRepo = repos => {setIndex(prev => prev == 0 ? repos.length-1 : prev-1)}
    const nextRepo = repos => {setIndex(prev => prev == repos.length-1 ? 0 : prev+1)}

    console.log(repos)

    return (
        <div className="github-repo-block">
            <div className="repo-header">REPOSITORIES [{index+1}/{repos.length}]</div>
             <div className="repo-menu">
                <div className="prev-button" onClick={() => prevRepo(repos)}>&lt;</div>
                <a
                    className="repo-name"
                    href={repos[index].html_url}
                >
                    {repos[index].name}
                </a>
                <div className="next-button" onClick={() => nextRepo(repos)}>&gt;</div>
            </div>
        </div>
    )
}
