workspace(name = "repro")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "aspect_bazel_lib",
    sha256 = "82e80cd47a5c2127ca0d717b7270fa833996c24dce389999c9d67e6c3eeb92e3",
    strip_prefix = "bazel-lib-0.11.10",
    url = "https://github.com/aspect-build/bazel-lib/archive/refs/tags/v0.11.10.tar.gz",
)

http_archive(
    name = "rules_pkg",
    sha256 = "a89e203d3cf264e564fcb96b6e06dd70bc0557356eb48400ce4b5d97c2c3720d",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_pkg/releases/download/0.5.1/rules_pkg-0.5.1.tar.gz",
        "https://github.com/bazelbuild/rules_pkg/releases/download/0.5.1/rules_pkg-0.5.1.tar.gz",
    ],
)

http_archive(
    name = "rules_nodejs",
    sha256 = "4d48998e3fa1e03c684e6bdf7ac98051232c7486bfa412e5b5475bbaec7bb257",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.5.0/rules_nodejs-core-5.5.0.tar.gz"],
)

http_archive(
    name = "aspect_rules_js",
    sha256 = "df5da45cd2c4a974200ef4bb640922132dfbee993f0c026e8937ec070c899d55",
    strip_prefix = "rules_js-0.7.1",
    url = "https://github.com/aspect-build/rules_js/archive/refs/tags/v0.7.1.tar.gz",
)

http_archive(
    name = "aspect_rules_swc",
    sha256 = "b1d92753c1cd052b14a2debdf48d89dfbbeb0b15b3f0b59e8e2cb7d987453ddb",
    strip_prefix = "rules_swc-dd0f77c903d7a911a5a44dbb91fb227619333d37",
    url = "https://github.com/aspect-build/rules_swc/archive/dd0f77c903d7a911a5a44dbb91fb227619333d37.tar.gz",
)

http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "85ffff62a4c22a74dbd98d05da6cf40f497344b3dbf1e1ab0a37ab2a1a6ca014",
    strip_prefix = "rules_docker-0.23.0",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.23.0/rules_docker-v0.23.0.tar.gz"],
)

# aspect_bazel_lib

load("@aspect_bazel_lib//lib:repositories.bzl", "aspect_bazel_lib_dependencies")

aspect_bazel_lib_dependencies()

# rules_pkg

load("@rules_pkg//:deps.bzl", "rules_pkg_dependencies")

rules_pkg_dependencies()

#
# Node.js
#

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@rules_nodejs//nodejs:repositories.bzl", "DEFAULT_NODE_VERSION", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = DEFAULT_NODE_VERSION,
)

load("@aspect_rules_js//js:npm_import.bzl", "translate_pnpm_lock")

translate_pnpm_lock(
    name = "npm",
    pnpm_lock = "//:pnpm-lock.yaml",
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()

#
# SWC
#

load("@aspect_rules_swc//swc:dependencies.bzl", "rules_swc_dependencies")

rules_swc_dependencies()

load("@aspect_rules_swc//swc:repositories.bzl", "swc_register_toolchains")

swc_register_toolchains(
    name = "swc",
    swc_version = "v1.2.168",
)

#
# Docker
#

load(
    "@io_bazel_rules_docker//toolchains/docker:toolchain.bzl",
    docker_toolchain_configure = "toolchain_configure",
)

docker_toolchain_configure(name = "docker_config")

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)

container_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", container_deps = "deps")

container_deps()

load(
    "@io_bazel_rules_docker//container:container.bzl",
    "container_pull",
)

container_pull(
    name = "debian",
    digest = "sha256:4aac17611920bd480c8f602d5246ff315d474e82f05c236a67d540e50c7f6dc8",
    registry = "index.docker.io",
    repository = "library/debian",
)
