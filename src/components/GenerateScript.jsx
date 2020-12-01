import React from 'react'

const TextFile = (ar) => {
    const element = document.createElement("a");
    const file = new Blob(ar, { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "gitpicasso.sh";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}


    const checkGithub = async (username, repo) => {
        const response = await fetch(`https://github.com/${username}/${repo}`)
        const status = response.status === 200 ? true : false;
        //return false if the github credentials invalid
        console.log('status', status)
        return status
    }


function handleSubmit(commits, repo, github) {
    const scriptLines = [];
    const gitStr = 'gitpicasso'
    scriptLines.push(`#!/bin/bash\n`)
    scriptLines.push(`REPO=${repo}\n`)
    scriptLines.push('git init $REPO\n')
    scriptLines.push(`cd $REPO\n`)
    scriptLines.push(`touch README.md\n`)
    scriptLines.push(`git add README.md\n`)
    scriptLines.push(`touch ${gitStr}\n`)
    scriptLines.push(`git add ${gitStr}\n`)

    //get commits key
    //convert extract only date part
    //no need id's already render what we need
    //read the count
    //run for loop for each count
    for (let date in commits) {
        for (let i = 0; i < commits[date].count; i++) {
            let scriptLine = `GIT_AUTHOR_DATE=${date}T12:00:00 GIT_COMMITTER_DATE=${date}T12:00:00 git commit --allow-empty -m "${gitStr}" > /dev/null\n`
            scriptLines.push(scriptLine)
        }
    }
    scriptLines.push(`git remote add origin git@github.com:${github}/$REPO.git\n`)
    scriptLines.push(`git pull origin master --allow-unrelated-histories\n`)
    scriptLines.push('git push -u origin master\n')


    TextFile(scriptLines);
    return scriptLines;
}
/*
2020-01-01-commit: {count: 3, color: "#216E39"}
2020-01-08-commit: {count: 1, color: "#40C462"}
2020-03-16-commit: {count: 1, color: "#40C462"}
2020-04-09-commit: {count: 3, color: "#216E39"}
2020-04-19-commit: {count: 2, color: "#30A14E"}
2020-06-16-commit: {count: 3, color: "#216E39"}
*/


function GenerateScript(props) {

    const { commits, repo, github } = props;

    if (!commits || !repo || !github) {
        return (
            <div class="window-body" className="errorMsg">
                <h4>Please fill out all the fields</h4>
          </div>

        )
    }
    return (
        <div>
            <button className="generate-btn" onClick={
                () => handleSubmit(commits, repo, github)
            }>Generate the Script</button>

        </div>

    )
}

export default GenerateScript