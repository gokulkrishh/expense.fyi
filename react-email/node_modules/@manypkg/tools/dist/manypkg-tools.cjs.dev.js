'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var fs = require('fs-extra');
var globby = require('globby');
var readYamlFile = require('read-yaml-file');
var jju = require('jju');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefault(path);
var fs__default = /*#__PURE__*/_interopDefault(fs);
var globby__default = /*#__PURE__*/_interopDefault(globby);
var readYamlFile__default = /*#__PURE__*/_interopDefault(readYamlFile);
var jju__default = /*#__PURE__*/_interopDefault(jju);

/**
 * A package.json access type.
 */

/**
 * An in-memory representation of a package.json file.
 */

/**
 * An individual package json structure, along with the directory it lives in,
 * relative to the root of the current monorepo.
 */

/**
 * A collection of packages, along with the monorepo tool used to load them,
 * and (if supported by the tool) the associated "root" package.
 */

/**
 * An object representing the root of a specific monorepo, with the root
 * directory and associated monorepo tool.
 *
 * Note that this type is currently not used by Tool definitions directly,
 * but it is the suggested way to pass around a reference to a monorepo root
 * directory and associated tool.
 */

/**
 * Monorepo tools may throw this error if a caller attempts to get the package
 * collection from a directory that is not a valid monorepo root.
 */
class InvalidMonorepoError extends Error {}

/**
 * A monorepo tool is a specific implementation of monorepos, whether provided built-in
 * by a package manager or via some other wrapper.
 *
 * Each tool defines a common interface for detecting whether a directory is
 * a valid instance of this type of monorepo, how to retrieve the packages, etc.
 */

/**
 * This internal method takes a list of one or more directory globs and the absolute path
 * to the root directory, and returns a list of all matching relative directories that
 * contain a `package.json` file.
 */
async function expandPackageGlobs(packageGlobs, directory) {
  const relativeDirectories = await globby__default["default"](packageGlobs, {
    cwd: directory,
    onlyDirectories: true,
    expandDirectories: false,
    ignore: ["**/node_modules"]
  });
  const directories = relativeDirectories.map(p => path__default["default"].resolve(directory, p)).sort();
  const discoveredPackages = await Promise.all(directories.map(dir => fs__default["default"].readJson(path__default["default"].join(dir, "package.json")).catch(err => {
    if (err && err.code === "ENOENT") {
      return undefined;
    }
    throw err;
  }).then(result => {
    if (result) {
      return {
        dir: path__default["default"].resolve(dir),
        relativeDir: path__default["default"].relative(directory, dir),
        packageJson: result
      };
    }
  })));
  return discoveredPackages.filter(pkg => pkg);
}

/**
 * A synchronous version of {@link expandPackagesGlobs}.
 */
function expandPackageGlobsSync(packageGlobs, directory) {
  const relativeDirectories = globby__default["default"].sync(packageGlobs, {
    cwd: directory,
    onlyDirectories: true,
    expandDirectories: false,
    ignore: ["**/node_modules"]
  });
  const directories = relativeDirectories.map(p => path__default["default"].resolve(directory, p)).sort();
  const discoveredPackages = directories.map(dir => {
    try {
      const packageJson = fs__default["default"].readJsonSync(path__default["default"].join(dir, "package.json"));
      return {
        dir: path__default["default"].resolve(dir),
        relativeDir: path__default["default"].relative(directory, dir),
        packageJson
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        return undefined;
      }
      throw err;
    }
  });
  return discoveredPackages.filter(pkg => pkg);
}

const BoltTool = {
  type: "bolt",
  async isMonorepoRoot(directory) {
    try {
      const pkgJson = await fs__default["default"].readJson(path__default["default"].join(directory, "package.json"));
      if (pkgJson.bolt && pkgJson.bolt.workspaces) {
        return true;
      }
    } catch (err) {
      if (err && err.code === "ENOENT") {
        return false;
      }
      throw err;
    }
    return false;
  },
  isMonorepoRootSync(directory) {
    try {
      const pkgJson = fs__default["default"].readJsonSync(path__default["default"].join(directory, "package.json"));
      if (pkgJson.bolt && pkgJson.bolt.workspaces) {
        return true;
      }
    } catch (err) {
      if (err && err.code === "ENOENT") {
        return false;
      }
      throw err;
    }
    return false;
  },
  async getPackages(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const pkgJson = await fs__default["default"].readJson(path__default["default"].join(rootDir, "package.json"));
      if (!pkgJson.bolt || !pkgJson.bolt.workspaces) {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${BoltTool.type} monorepo root: missing bolt.workspaces entry`);
      }
      const packageGlobs = pkgJson.bolt.workspaces;
      return {
        tool: BoltTool,
        packages: await expandPackageGlobs(packageGlobs, rootDir),
        rootPackage: {
          dir: rootDir,
          relativeDir: ".",
          packageJson: pkgJson
        },
        rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${BoltTool.type} monorepo root: missing package.json`);
      }
      throw err;
    }
  },
  getPackagesSync(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const pkgJson = fs__default["default"].readJsonSync(path__default["default"].join(rootDir, "package.json"));
      if (!pkgJson.bolt || !pkgJson.bolt.workspaces) {
        throw new InvalidMonorepoError(`Directory ${directory} is not a valid ${BoltTool.type} monorepo root: missing bolt.workspaces entry`);
      }
      const packageGlobs = pkgJson.bolt.workspaces;
      return {
        tool: BoltTool,
        packages: expandPackageGlobsSync(packageGlobs, rootDir),
        rootPackage: {
          dir: rootDir,
          relativeDir: ".",
          packageJson: pkgJson
        },
        rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${BoltTool.type} monorepo root: missing package.json`);
      }
      throw err;
    }
  }
};

const LernaTool = {
  type: "lerna",
  async isMonorepoRoot(directory) {
    try {
      const lernaJson = await fs__default["default"].readJson(path__default["default"].join(directory, "lerna.json"));
      if (lernaJson.useWorkspaces !== true) {
        return true;
      }
    } catch (err) {
      if (err && err.code === "ENOENT") {
        return false;
      }
      throw err;
    }
    return false;
  },
  isMonorepoRootSync(directory) {
    try {
      const lernaJson = fs__default["default"].readJsonSync(path__default["default"].join(directory, "lerna.json"));
      if (lernaJson.useWorkspaces !== true) {
        return true;
      }
    } catch (err) {
      if (err && err.code === "ENOENT") {
        return false;
      }
      throw err;
    }
    return false;
  },
  async getPackages(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const lernaJson = await fs__default["default"].readJson(path__default["default"].join(rootDir, "lerna.json"));
      const pkgJson = await fs__default["default"].readJson(path__default["default"].join(rootDir, "package.json"));
      const packageGlobs = lernaJson.packages || ["packages/*"];
      return {
        tool: LernaTool,
        packages: await expandPackageGlobs(packageGlobs, rootDir),
        rootPackage: {
          dir: rootDir,
          relativeDir: ".",
          packageJson: pkgJson
        },
        rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${LernaTool.type} monorepo root: missing lerna.json and/or package.json`);
      }
      throw err;
    }
  },
  getPackagesSync(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const lernaJson = fs__default["default"].readJsonSync(path__default["default"].join(rootDir, "lerna.json"));
      const pkgJson = fs__default["default"].readJsonSync(path__default["default"].join(rootDir, "package.json"));
      const packageGlobs = lernaJson.packages || ["packages/*"];
      return {
        tool: LernaTool,
        packages: expandPackageGlobsSync(packageGlobs, rootDir),
        rootPackage: {
          dir: rootDir,
          relativeDir: ".",
          packageJson: pkgJson
        },
        rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${LernaTool.type} monorepo root: missing lerna.json and/or package.json`);
      }
      throw err;
    }
  }
};

const PnpmTool = {
  type: "pnpm",
  async isMonorepoRoot(directory) {
    try {
      const manifest = await readYamlFile__default["default"](path__default["default"].join(directory, "pnpm-workspace.yaml"));
      if (manifest.packages) {
        return true;
      }
    } catch (err) {
      if (err && err.code === "ENOENT") {
        return false;
      }
      throw err;
    }
    return false;
  },
  isMonorepoRootSync(directory) {
    try {
      const manifest = readYamlFile.sync(path__default["default"].join(directory, "pnpm-workspace.yaml"));
      if (manifest.packages) {
        return true;
      }
    } catch (err) {
      if (err && err.code === "ENOENT") {
        return false;
      }
      throw err;
    }
    return false;
  },
  async getPackages(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const manifest = await readYamlFile__default["default"](path__default["default"].join(rootDir, "pnpm-workspace.yaml"));
      const pkgJson = await fs__default["default"].readJson(path__default["default"].join(rootDir, "package.json"));
      const packageGlobs = manifest.packages;
      return {
        tool: PnpmTool,
        packages: await expandPackageGlobs(packageGlobs, rootDir),
        rootPackage: {
          dir: rootDir,
          relativeDir: ".",
          packageJson: pkgJson
        },
        rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${PnpmTool.type} monorepo root: missing pnpm-workspace.yaml and/or package.json`);
      }
      throw err;
    }
  },
  getPackagesSync(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const manifest = readYamlFile.sync(path__default["default"].join(rootDir, "pnpm-workspace.yaml"));
      const pkgJson = fs__default["default"].readJsonSync(path__default["default"].join(rootDir, "package.json"));
      const packageGlobs = manifest.packages;
      return {
        tool: PnpmTool,
        packages: expandPackageGlobsSync(packageGlobs, rootDir),
        rootPackage: {
          dir: rootDir,
          relativeDir: ".",
          packageJson: pkgJson
        },
        rootDir: rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${PnpmTool.type} monorepo root: missing pnpm-workspace.yaml and/or package.json`);
      }
      throw err;
    }
  }
};

const RootTool = {
  type: "root",
  async isMonorepoRoot(directory) {
    // The single package tool is never the root of a monorepo.
    return false;
  },
  isMonorepoRootSync(directory) {
    // The single package tool is never the root of a monorepo.
    return false;
  },
  async getPackages(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const pkgJson = await fs__default["default"].readJson(path__default["default"].join(rootDir, "package.json"));
      const pkg = {
        dir: rootDir,
        relativeDir: ".",
        packageJson: pkgJson
      };
      return {
        tool: RootTool,
        packages: [pkg],
        rootPackage: pkg,
        rootDir: rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${RootTool.type} monorepo root`);
      }
      throw err;
    }
  },
  getPackagesSync(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const pkgJson = fs__default["default"].readJsonSync(path__default["default"].join(rootDir, "package.json"));
      const pkg = {
        dir: rootDir,
        relativeDir: ".",
        packageJson: pkgJson
      };
      return {
        tool: RootTool,
        packages: [pkg],
        rootPackage: pkg,
        rootDir: rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${RootTool.type} monorepo root`);
      }
      throw err;
    }
  }
};

const RushTool = {
  type: "rush",
  async isMonorepoRoot(directory) {
    try {
      await fs__default["default"].readFile(path__default["default"].join(directory, "rush.json"), "utf8");
      return true;
    } catch (err) {
      if (err && err.code === "ENOENT") {
        return false;
      }
      throw err;
    }
    return false;
  },
  isMonorepoRootSync(directory) {
    try {
      fs__default["default"].readFileSync(path__default["default"].join(directory, "rush.json"), "utf8");
      return true;
    } catch (err) {
      if (err && err.code === "ENOENT") {
        return false;
      }
      throw err;
    }
    return false;
  },
  async getPackages(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const rushText = await fs__default["default"].readFile(path__default["default"].join(rootDir, "rush.json"), "utf8");

      // Rush configuration files are full of inline and block-scope comment blocks (JSONC),
      // so we use a parser that can handle that.
      const rushJson = jju__default["default"].parse(rushText);
      const directories = rushJson.projects.map(project => path__default["default"].resolve(rootDir, project.projectFolder));
      const packages = await Promise.all(directories.map(async dir => {
        return {
          dir,
          relativeDir: path__default["default"].relative(directory, dir),
          packageJson: await fs__default["default"].readJson(path__default["default"].join(dir, "package.json"))
        };
      }));

      // Rush does not have a root package
      return {
        tool: RushTool,
        packages,
        rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${RushTool.type} monorepo root: missing rush.json`);
      }
      throw err;
    }
  },
  getPackagesSync(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const rushText = fs__default["default"].readFileSync(path__default["default"].join(rootDir, "rush.json"), "utf8");

      // Rush configuration files are full of inline and block-scope comment blocks (JSONC),
      // so we use a parser that can handle that.
      const rushJson = jju__default["default"].parse(rushText);
      const directories = rushJson.projects.map(project => path__default["default"].resolve(rootDir, project.projectFolder));
      const packages = directories.map(dir => {
        const packageJson = fs__default["default"].readJsonSync(path__default["default"].join(dir, "package.json"));
        return {
          dir,
          relativeDir: path__default["default"].relative(directory, dir),
          packageJson
        };
      });

      // Rush does not have a root package
      return {
        tool: RushTool,
        packages,
        rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${RushTool.type} monorepo root: missing rush.json`);
      }
      throw err;
    }
  }
};

const YarnTool = {
  type: "yarn",
  async isMonorepoRoot(directory) {
    try {
      const pkgJson = await fs__default["default"].readJson(path__default["default"].join(directory, "package.json"));
      if (pkgJson.workspaces) {
        if (Array.isArray(pkgJson.workspaces) || Array.isArray(pkgJson.workspaces.packages)) {
          return true;
        }
      }
    } catch (err) {
      if (err && err.code === "ENOENT") {
        return false;
      }
      throw err;
    }
    return false;
  },
  isMonorepoRootSync(directory) {
    try {
      const pkgJson = fs__default["default"].readJsonSync(path__default["default"].join(directory, "package.json"));
      if (pkgJson.workspaces) {
        if (Array.isArray(pkgJson.workspaces) || Array.isArray(pkgJson.workspaces.packages)) {
          return true;
        }
      }
    } catch (err) {
      if (err && err.code === "ENOENT") {
        return false;
      }
      throw err;
    }
    return false;
  },
  async getPackages(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const pkgJson = await fs__default["default"].readJson(path__default["default"].join(rootDir, "package.json"));
      const packageGlobs = Array.isArray(pkgJson.workspaces) ? pkgJson.workspaces : pkgJson.workspaces.packages;
      return {
        tool: YarnTool,
        packages: await expandPackageGlobs(packageGlobs, rootDir),
        rootPackage: {
          dir: rootDir,
          relativeDir: ".",
          packageJson: pkgJson
        },
        rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${YarnTool.type} monorepo root`);
      }
      throw err;
    }
  },
  getPackagesSync(directory) {
    const rootDir = path__default["default"].resolve(directory);
    try {
      const pkgJson = fs__default["default"].readJsonSync(path__default["default"].join(rootDir, "package.json"));
      const packageGlobs = Array.isArray(pkgJson.workspaces) ? pkgJson.workspaces : pkgJson.workspaces.packages;
      return {
        tool: YarnTool,
        packages: expandPackageGlobsSync(packageGlobs, rootDir),
        rootPackage: {
          dir: rootDir,
          relativeDir: ".",
          packageJson: pkgJson
        },
        rootDir
      };
    } catch (err) {
      if (err && err.code === "ENOENT") {
        throw new InvalidMonorepoError(`Directory ${rootDir} is not a valid ${YarnTool.type} monorepo root`);
      }
      throw err;
    }
  }
};

exports.BoltTool = BoltTool;
exports.InvalidMonorepoError = InvalidMonorepoError;
exports.LernaTool = LernaTool;
exports.PnpmTool = PnpmTool;
exports.RootTool = RootTool;
exports.RushTool = RushTool;
exports.YarnTool = YarnTool;
