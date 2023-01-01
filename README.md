# vscode-postfix-completion

This repo is based on [vscode-postfix-completion](https://github.com/gorpher/vscode-postfix-completion).
Add support for C++, and support word and whole line substitution.

Postfix templates for C++/TypeScript/JavaScript/GO/Rust/More.

## Features
- secondary development builds its own postfix template.
- support for multiple languages.
- support for custom configuration.
- support substitute current word or current line


## Extension Settings

```json
"postfix_complection.templates": [{
   "postfix_complection.templates": [
      { // declare an auto variable
         "name": "auto",
         "language": "cpp",
         "description": "auto variable",
         "body": "auto $1 = {{expr}}$0",
         "mode": "line",
      },
      { // define a shared ptr
         "name": "sharedptr",
         "language": "cpp",
         "description": "declare sharedptr of some type",
         "body": "std::shared_ptr<{{expr}}> $1",
         "mode": "word",
      },
      {
         "name": ":",
         "language":"go",
         "description": "Assigns the expression to a new variable by using :=.",
         "body": "$1 := {{expr}}\n$0"
      },
      {
         "name": "if",
         "language":"javascript",
         "description": "Creates if statement from given boolean expression.",
         "body": "if ({{expr}}) {\n{{indent}}${0}\n}"
      },
   ],
}]
```

Note:
1. {{expr}} is a placeholder for the current line or current word to be substituted
2. $1 will be the first cursor position, $2 second cursor position, etc. $0 is the final cursor position.
3. mode could be "line" or "word", default value is "line". "line" means current line will be substituted, "word" means current word will be substituted.


## Developer
### Run or debug

```bash
# step 1. clone the code, to local directory, ~/Code/extension for example.
git clone current_url ~/Code/extension
# step 2: install yarn and all the dependencies
cd ~/Code/extension
# install yarn
npm install -g yarn
# install dependencies
yarn install
```

### Package


```bash
cd ~/Code/extension
# step 1. install vsce (VisualStudio Code Extensions)
npm install -g @vscode/vsce
# step 2. packaging
vsce package
# and if no error, a file with .vsix entension under current direcotry will be created, such as:
# vscode-postfix-completion-0.0.1.vsix
```

For more details: [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## TODO

- Analytical expression,depending on the type of data ,to provider a corresponding template


## Release Notes

### 0.0.1
replace the line expression text.
