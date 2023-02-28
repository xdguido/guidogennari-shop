// build: when changes are made to the build system, such as updating build tools or scripts, modifying build configurations, or changing dependencies. For example, adding a new npm package or updating an existing one could warrant using this prefix.
// ci: when changes are made to the Continuous Integration (CI) system, such as updating build scripts or configuration files, or modifying how tests are run. Examples of CI systems include Travis, Jenkins, and CircleCI.
// docs: when changes are made to documentation, such as updating README files, adding or modifying comments in code, or updating API documentation.
// feat: when a new feature is added to the codebase. Examples of new features include adding a new endpoint to a REST API, implementing a new user interface component, or adding a new configuration option.
// fix: when a bug is fixed. Examples of bugs include incorrect calculations, broken user flows, or other unexpected behavior.
// perf: when code is changed to improve performance, such as optimizing algorithms, improving caching, or reducing memory usage.
// refactor: when code is changed to improve code quality, without adding new features or fixing bugs. Examples of refactoring include renaming variables, simplifying logic, or removing dead code.
// style: when changes are made to code style, such as fixing indentation, removing trailing whitespace, or updating variable names to adhere to a particular style guide.
// test: when changes are made to tests, such as adding new test cases, updating existing tests, or improving test coverage. This prefix can be helpful to quickly identify changes that affect testing, especially in larger codebases where changes to tests can be significant.
// translation: when changes are made to translations within the codebase. This can include adding new translations, modifying existing translations, or fixing errors in translations. For example, if your application supports multiple languages and a new translation is added, you can use this prefix to indicate the change.
// security: when changes are made to improve the security of the codebase. This can include fixing security vulnerabilities, updating security-related dependencies, or implementing security best practices. For example, if a security vulnerability is identified and fixed, you can use this prefix to indicate the change.
// changeset: to indicate that a specific set of changes has been made. This can be useful when multiple changes are made to the codebase, but they are all related to a specific feature or functionality. For example, if you are working on a new feature and make several related changes, you can use this prefix to indicate that they are all part of the same changeset.
// chore: for changes that are related to maintenance tasks, such as updating dependencies, removing unused code, or cleaning up code formatting. This prefix can also be used for changes that are not related to code, such as updating documentation or making changes to project management tools. For example, if you update the version of a dependency used in your project, you can use this prefix to indicate the change.
// revert: when reverting a previous commit, such as when a change introduces new issues or causes unexpected behavior. This can be helpful in maintaining a clean and stable codebase. For example, if a commit introduced a bug, and you need to revert the changes made in that commit, you can use this prefix to indicate that the change is a revert.

// config: when changes are made to configuration files, such as updating environment variables, changing server settings, or modifying deployment scripts.
// init: for the initial commit when starting a new project or repository.

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-leading-blank': [1, 'always'],
        'body-max-line-length': [2, 'always', 100],
        'footer-leading-blank': [1, 'always'],
        'footer-max-line-length': [2, 'always', 100],
        'header-max-length': [2, 'always', 100],
        'scope-case': [2, 'always', 'lower-case'],
        'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'config',
                'init',
                'build',
                'chore',
                'ci',
                'docs',
                'feat',
                'fix',
                'perf',
                'refactor',
                'revert',
                'style',
                'test',
                'translation',
                'security',
                'changeset'
            ]
        ]
    }
};
