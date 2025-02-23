function exceptions(module) {
    /** Special Exception for a repository with no node_modules */
    if (module === "Your exception for a repository with no node_modules") return "SE"; // Returns SE (or Special Exceptions)
    else return "NE"; // Returns NE (or No Exceptions)
}

function defineInstallerConfig() {
    const author_github_page = "https://github.com/cassitly"

    const organized_config = {
        modules: {
            // Define the modules you want the installer to install.
            git: {
                name: [], // The name of the module (It has to be the same as the name of the repo)

                url: [], // NOTE: use the .git url like https://github.com/cassitly/api-plugin.git
                        // So that the installer can clone the repo

                special: {} // The special bracket is for verification that the module actually installed. So just put
                            // the name of the module and the link of the repository like this.
                            // { "api-plugin": "https://github.com/cassitly/api-plugin.git" }
            },
            npm: {
                name: [], // The name of the repository that needs to have nodejs modules installed (The ones that doesn't need also needs to be here.)
            },
        },
        devDependencies: {},
        package: {
            author: {
                name: "Cassitly",
                email: "cassitly.github@gmail.com",
                url: author_github_page
            },

            repository: author_github_page + "/api-plugin.git",
            issues: author_github_page + "/api-plugin/issues",
        }
    }

    return organized_config;
}

module.exports = { exceptions, defineInstallerConfig };