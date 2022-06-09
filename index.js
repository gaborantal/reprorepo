import * as eslint from 'eslint';
import * as fs from 'fs';
import * as path from 'path';

const defaultTSConfigurationPath = path.resolve("./typescript-eslint.json");

function resolvePathForTSConfig(filePath) {
    return path.basename(filePath);
}

function readProjectTsconfig(typeScriptOptions, tsConfigContent) {

    console.log("Creating temporary tsconfig.json...");

    let tempDir = ".";
    const tempTsConfigPath = path.resolve(tempDir, "tsconfig.json");

    typeScriptOptions["baseConfig"]["parserOptions"]["project"] = tempTsConfigPath;


    for (let index in inputList) {
        tsConfigContent["include"].push(resolvePathForTSConfig(inputList[index]));
    }

    fs.writeFileSync(tempTsConfigPath, JSON.stringify(tsConfigContent));
    typeScriptOptions["baseConfig"]["parserOptions"]["project"] = tempTsConfigPath;
}

function readDefaultRules() {
    return JSON.parse(fs.readFileSync(defaultTSConfigurationPath, "utf8"));
}

let typescriptEslintConfig;

const inputList = ["asd/no-extra-bind.js"];

function runESLint() {
    "use strict";

    typescriptEslintConfig = readDefaultRules();

    const typeScriptOptions = {
        baseConfig: {
            root: true,
            env: {
                es2020: true,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: false
                },
                tsconfigRootDir: "",
                project: [],
                rules: ""
            },
            overrides: [
                {
                    files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
                    excludedFiles: [],
                    extends: [],
                    settings: {
                        import: {
                            parsers: {
                                "@typescript-eslint/parser": ["*.ts", "*.tsx", "*.js", "*.jsx"],
                            }
                        }
                    }
                }
            ],
            plugins: [
                "@typescript-eslint/eslint-plugin",
            ],
            parser: "@typescript-eslint/parser",
            ignorePatterns: ["**/*.config.js", "**/*.config.ts", ".eslintrc*", "**/*.conf.js", "**/*.conf.ts", "**/*-config.js", "**/*-config.ts", "gulpfile.js"]
        },
        useEslintrc: false,
        globInputPaths: false,
    };

    typeScriptOptions["baseConfig"]["parserOptions"]["sourceType"] = "script";
    typeScriptOptions["baseConfig"]["parserOptions"]["tsconfigRootDir"] = path.dirname(inputList[0]);

    let defaultTSConfig = {
        compilerOptions: {
            baseUrl: "node_modules",
            target: "es2020",
            module: "commonjs",
            moduleResolution: "node",
            noEmitOnError: true,
            lib: [
                "es2020"
            ],
            allowJs: true,
            strict: true,
            esModuleInterop: false,
            outDir: "dist"
        },
        include: [],
        exclude: [
            "node_modules",
            "dist"
        ]
    };

    readProjectTsconfig(typeScriptOptions, defaultTSConfig);


    typeScriptOptions["baseConfig"]["rules"] = typescriptEslintConfig;


    console.log("Tsconfig")
    console.log(defaultTSConfig)
    console.log("TS options")
    console.log(typeScriptOptions)

    let eslintProgram = new eslint.ESLint(typeScriptOptions);

    eslintProgram.lintFiles(inputList).then(results => {
        for (const r of results) {
            console.log(r)
        }
    }).catch(err => {
        console.log(err)
        console.log("An error occurred");
    }).finally(() => {
        console.log("Finished!");
    });
}


runESLint();
