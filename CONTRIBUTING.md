# Contributing Guide

## Building the development environment

1. Clone the repository.
2. Install the dependent libraries in the repository.

    ```bash
    yarn install
    ```

3. Build the source code, see Build in Scripts.
4. Link the project so that the formadocs command can be executed.

    ```bash
    yarn link
    ```

5. Develop.
  Run the `formadocs` command to execute the last built code.

  ```bash
  # Run formadocs command
  $ formadocs
  ...
  ```

If you want to uninstall the `formadocs` command under development, run the `yarn unlink` command.

## Scripts

### Build

```bash
# Run the build of ts and tsx files.
$ yarn build
# Build with file change detection.
$ yarn build:watch
```

### Lint & Format

In this project, we are using eslint as the linter and prettier and eslint as the formatter.

```bash
# Run lint.
$ yarn lint
# After formatting with prettier, formatting with eslint will be performed.
$ yarn format
```
